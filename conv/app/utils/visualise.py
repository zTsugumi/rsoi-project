import sys
import numpy as np
import tensorflow as tf
import tensorflow.keras as keras
from tensorflow.keras import Model
from tensorflow.keras.layers import Input, InputLayer, Conv2D, MaxPooling2D, Dense, Activation, Flatten


class VInput(object):
  ''' A class for forward, backward ops on Input
  '''
  def __init__(self, layer):
    self.layer = layer

  def forward(self, data):
    self.forw_data = data
    return self.forw_data

  def backward(self, data):
    self.back_data = data
    return self.back_data


class VConv2D(object):
  ''' A class for forward, backward ops on Conv2D
  '''
  def __init__(self, layer):
    self.layer = layer

    weights = layer.get_weights()
    config = layer.get_config()

    input = Input(layer.input_shape[1:])
    output = Conv2D.from_config(config)(input)
    forw_model = Model(input, output)
    forw_model.layers[1].set_weights(weights)
    self.forw_model = forw_model

    w, b = weights
    w = np.transpose(w, [0, 1, 3, 2])
    w= w[::-1, ::-1, :, :]
    config['filters'] = w.shape[3]
    config['kernel_size'] = (w.shape[0], w.shape[1])
    b = np.zeros(config['filters'])
    input = Input(layer.output_shape[1:])
    output = Conv2D.from_config(config)(input)
    back_model = Model(input, output)
    back_model.layers[1].set_weights((w, b))
    self.back_model = back_model

  def forward(self, data):
    self.forw_data = self.forw_model.predict(data)
    return self.forw_data

  def backward(self, data):
    self.back_data = self.back_model.predict(data)
    return self.back_data


class VPool(object):
  ''' A class for forward, backward ops on Pooling
  '''
  def __init__(self, layer):
    self.layer = layer
    self.pool_size = layer.pool_size

  def forward(self, data):
    [self.forw_data, self.switch] = self.__max_pooling_with_switch(data)
    return self.forw_data

  def backward(self, data):
    self.back_data = self.__max_unpooling_with_switch(data, self.switch)
    return self.back_data

  def __max_pooling_with_switch(self, input, pool_size):
    ''' Compute pooling of input in forward pass, switch stores location
        of the maximum value in each pooling block of size pool_size x pool_size
      Args:
        input: data
        pool_size: size of pooling block
      Output:
        Pooled result and Switch
    '''
    switch = np.zeros(input.shape)
    out_shape = list(input.shape)
    row_poolsize = int(pool_size[0])
    col_poolsize = int(pool_size[1])
    out_shape[1] = out_shape[1] // pool_size[0]
    out_shape[2] = out_shape[2] // pool_size[1]
    pooled = np.zeros(out_shape)

    for sample in range(input.shape[0]):
      for dim in range(input.shape[3]):
          for row in range(out_shape[1]):
              for col in range(out_shape[2]):
                  patch = input[sample,
                          row * row_poolsize: (row + 1) * row_poolsize,
                          col * col_poolsize: (col + 1) * col_poolsize,
                          dim]
                  max_value = patch.max()
                  pooled[sample, row, col, dim] = max_value
                  max_col_index = patch.argmax(axis=-1)
                  max_cols = patch.max(axis=-1)
                  max_row = max_cols.argmax()
                  max_col = max_col_index[max_row]
                  switch[sample,
                          row * row_poolsize + max_row,
                          col * col_poolsize + max_col,
                          dim] = 1
    return [pooled, switch]

  def __max_unpooling_with_switch(self, input, switch):
    ''' Compute unpooled output using pooled data and switch
      Args:
        input: data
        poolsize: size of pooling block
        switch: switch storing location of each elements
      Output:
        Unpooled result
    '''
    out_shape = switch.shape
    unpooled = np.zeros(out_shape)
    for sample in range(input.shape[0]):
      for dim in range(input.shape[3]):
        tile = np.ones((switch.shape[1] // input.shape[1],
                        switch.shape[2] // input.shape[2]))
        out = np.kron(input[sample, :, :, dim], tile)
        unpooled[sample, :, :, dim] = out * switch[sample, :, :, dim]
    return unpooled


class VActivation(object):
  ''' A class to define forward and backward ops on Activation
  '''
  def __init__(self, layer, linear=False):
    self.layer = layer
    self.linear = linear
    self.activation = layer.activation

    input = Input(layer.output_shape[1:])
    output = self.activation(input)

    self.forw_model = Model(input, output)
    self.back_model = Model(input, output)

  def forward(self, data):
    self.forw_data = self.forw_model(data)[0]
    return self.forw_data

  def back(self, data):
    self.back_data = self.back_model(data)[0]
    return self.back_data


class VDense(object):
  ''' A class for forward, backward ops on Dense
  '''
  def __init__(self, layer):
    self.layer = layer

    weights = layer.get_weights()
    config = layer.get_config()

    input = Input(layer.input_shape[1:])
    output = Dense.from_config(config)(input)
    forw_model = Model(input, output)
    forw_model.set_weights(weights)
    self.forw_model = forw_model

    w, b = weights
    w = w.tranpose()
    input_shape = layer.input_shape
    output_shape = layer.output_shape
    b = np.zeros(input_shape[1])
    weights_transposed = [w, b]

    input = Input(output_shape[1:])
    output = Dense(input_shape[1])(input)
    back_model = Model(input, output)
    back_model.set_weights(weights_transposed)
    self.back_model = back_model

  def forward(self, data):
    self.forw_data = self.forw_model.predict(data)
    return self.forw_data

  def backward(self, data):
    self.back_data = self.back_model.predict(data)
    return self.back_data


class VFlatten(object):
  ''' A class for forward, backward ops on Dense
  '''
  def __init__(self, layer):
    self.layer = layer
    self.shape = layer.input_shape[1:]
    self.forw_model = Model(layer.input, layer.output)

  def forward(self, data):
    self.forw_data = self.forw_model(data)[0]
    return self.forw_data

  def backward(self, data):
    new_shape = [data.shape[0]] + list(self.shape)
    assert np.prod(self.shape) == np.prod(data.shape[1:])
    self.back_data = np.reshape(data, new_shape)
    return self.back_data


def find_top_filters(output, top=8):
  filter_sum = []
  for filter_index in range(output.shape[-1]):
    if output.ndim == 2:
        sum_value = np.sum(output[:, filter_index])
    else:
        sum_value = np.sum(output[:, :, :, filter_index])
    if sum_value > 0:
        filter_sum.append((filter_index, sum_value))
  filter_sum.sort(key=lambda x: x[1], reverse=True)

  return filter_sum[:top]


def visualise_layers(model, data, layer_name='predictions', mode='all'):
  ''' Function to visualise feature maps of layers
    Args:
      model: Pre-trained model used to visualise data
      data: Image data to be visualised
      layer_name: Name of the data to visualise
      mode: Visualise mode, {'all', 'mode'}.
        'max': pick only the maximum activation in a feature map and mask
               others to 0s. This is called maximum stimulus
        'all': use all values in a feature map
  '''
  layers_to_visualize = []

  # Get all layers from input to the chosen one
  for layer in model.layers:
    if isinstance(layer, InputLayer):
      layers_to_visualize.append((layer.name, VInput(layer)))
    elif isinstance(layer, Conv2D):
      layers_to_visualize.append((layer.name, VConv2D(layer)))
      layers_to_visualize.append((layer.name + '_activation', VActivation(layer)))
    elif isinstance(layer, MaxPooling2D):
      layers_to_visualize.append((layer.name, VPool(layer)))
    elif isinstance(layer, Dense):
      layers_to_visualize.append((layer.name, VDense(layer)))
      layers_to_visualize.append((layer.name + '_activation', VActivation(layer)))
    elif isinstance(layer, Activation):
      layers_to_visualize.append((layer.name, VActivation(layer)))
    elif isinstance(layer, Flatten):
      layers_to_visualize.append((layer.name, VFlatten(layer)))
    else:
      print('Unknown Layer Type')
      print(layer.get_config())
      sys.exit()
    if layer_name == layer.name:
      break

  # Forward pass
  prev_data = layers_to_visualize[0][1].forward(data)
  for layer in layers_to_visualize[1:]:
    prev_data = layer[1].forward(prev_data)

  # Select layers to visualize
  model_layers = set([layer.name for layer in model.layers])
  layers_to_visualize = [layer for layer in layers_to_visualize
                          if layer[0] in model_layers]
  layers_to_visualize.reverse()
  layers_to_visualize.pop()         # Remove the input layer

  res_dict = dict()
  for idx, layer in enumerate(layers_to_visualize):
    fm_list = []                    # fm: feature map

    fm = layer[1].forw_data

    top_fms = find_top_filters(fm)

    for feature, _ in top_fms:
      if fm.ndim == 2:
        selected_fm = fm[:, feature]
      else:
        selected_fm = fm[:, :, :, feature]

      if mode == 'max':
        max_activation = selected_fm.max()
        mask = selected_fm == max_activation
        selected_fm = selected_fm * mask
      elif mode != 'all':
        print('Unknown Visualize Mode')
        sys.exit()

      output = np.zeros_like(fm)
      if fm.ndim == 2:
        output[:, feature] = selected_fm
      else:
        output[:, :, :, feature] = selected_fm

      # Backward pass
      cons_data = layer[1].backward(output)
      for rev_layer in layers_to_visualize[idx - 1:-1:-1]:
        cons_data = rev_layer[1].backward(cons_data)

      fm_list.append(cons_data.squeeze())

    res_dict[layer[0]] = fm_list

  return res_dict

