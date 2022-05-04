import sys
import numpy as np
import tensorflow as tf
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
    w = tf.transpose(w, [0, 1, 3, 2])
    w = w[::-1, ::-1, :, :]
    config['filters'] = w.shape[3]
    config['kernel_size'] = (w.shape[0], w.shape[1])
    b = tf.zeros(config['filters'])
    input = Input(layer.output_shape[1:])
    output = Conv2D.from_config(config)(input)
    back_model = Model(input, output)
    back_model.layers[1].set_weights((w, b))
    self.back_model = back_model

  def forward(self, data):
    self.forw_data = self.forw_model(data)
    return self.forw_data

  def backward(self, data):
    self.back_data = self.back_model(data)
    return self.back_data


class VPool(object):
  ''' A class for forward, backward ops on Pooling
  '''
  def __init__(self, layer):
    self.layer = layer
    self.pool_size = layer.pool_size

  def forward(self, data):
    [self.forw_data, self.switch] = self.__max_pooling_with_switch(data, self.pool_size)
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
    pooled, argmax = tf.nn.max_pool_with_argmax(input, pool_size, 2, 'VALID', include_batch_in_index=True)
    argmax = tf.reshape(tf.cast(argmax, tf.int32), [-1])
    indices = tf.unravel_index(argmax, input.shape)
    indices = tf.transpose(indices, [1, 0])

    updates = tf.zeros([indices.shape[0]]) + 1.

    switch = tf.scatter_nd(indices, updates, input.shape)

    return [pooled, switch]

  def __max_unpooling_with_switch(self, input, switch):
    ''' Compute unpooled output using pooled data and switch
      Args:
        input: data
        switch: switch storing location of each elements
      Output:
        Unpooled result
    '''
    out_shape = switch.shape
    unpooled = np.zeros(out_shape)
    tile = np.ones((switch.shape[1] // input.shape[1],
                    switch.shape[2] // input.shape[2]))
    tile = np.reshape(tile, [1, tile.shape[0], tile.shape[1], 1])

    unpooled = np.kron(input, tile)

    unpooled = unpooled * switch

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
    self.forw_data = self.forw_model(data)
    return self.forw_data

  def backward(self, data):
    self.back_data = self.back_model(data)
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
    b = tf.zeros(input_shape[1])
    weights_transposed = [w, b]

    input = Input(output_shape[1:])
    output = Dense(input_shape[1])(input)
    back_model = Model(input, output)
    back_model.set_weights(weights_transposed)
    self.back_model = back_model

  def forward(self, data):
    self.forw_data = self.forw_model(data)
    return self.forw_data

  def backward(self, data):
    self.back_data = self.back_model(data)
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

    self.back_data = tf.reshape(data, new_shape)
    return self.back_data


def find_top_filters(output, top=8):
  if output.ndim == 2:
    sum_value = tf.reduce_sum(output, axis=[0])
  else:
    sum_value = tf.reduce_sum(output, axis=[0, 1, 2])

  top_idx = tf.argsort(sum_value, axis=-1, direction='DESCENDING', stable=True)

  return top_idx[:top]


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
  layers_with_activations = []

  # Get all layers from input to the chosen one
  for layer in model.layers:
    if isinstance(layer, InputLayer):
      layers_with_activations.append((layer.name, VInput(layer)))
    elif isinstance(layer, Conv2D):
      layers_with_activations.append((layer.name, VConv2D(layer)))
      layers_with_activations.append((layer.name + '_activation', VActivation(layer)))
    elif isinstance(layer, MaxPooling2D):
      layers_with_activations.append((layer.name, VPool(layer)))
    elif isinstance(layer, Dense):
      layers_with_activations.append((layer.name, VDense(layer)))
      layers_with_activations.append((layer.name + '_activation', VActivation(layer)))
    elif isinstance(layer, Activation):
      layers_with_activations.append((layer.name, VActivation(layer)))
    elif isinstance(layer, Flatten):
      layers_with_activations.append((layer.name, VFlatten(layer)))
    else:
      print('Unknown Layer Type')
      print(layer.get_config())
      sys.exit()
    if layer_name == layer.name:
      break

  # Forward pass
  prev_data = layers_with_activations[0][1].forward(data)
  for layer in layers_with_activations[1:]:
    prev_data = layer[1].forward(prev_data)

  # Select layers to visualize
  model_layers = set([layer.name for layer in model.layers])
  layers_to_visualize = [(idx, layer) for idx, layer in enumerate(layers_with_activations)
                          if layer[0] in model_layers]
  layers_to_visualize.reverse()
  layers_to_visualize.pop()         # Remove the input layer

  res_dict = dict()
  for idx, layer in layers_to_visualize:
    fm_list = []                    # fm: feature map
    fm = layer[1].forw_data
    top_fms_idx = find_top_filters(fm)

    for idx_fm in top_fms_idx:
      selected_fm = fm[..., idx_fm]

      if mode == 'max':
        max_activation = tf.reduce_max(selected_fm)
        mask = selected_fm == max_activation
        selected_fm = selected_fm * mask
      elif mode != 'all':
        print('Unknown Visualize Mode')
        sys.exit()

      output = np.zeros_like(fm)
      output[..., idx_fm] = selected_fm

      back_data = layer[1].backward(output)
      for j in range(idx - 1, -1, -1):
        back_data = layers_with_activations[j][1].backward(back_data)

      fm_list.append(tf.squeeze(back_data))

    res_dict[layer[0]] = fm_list

  return res_dict

