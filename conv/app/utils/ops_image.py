import cv2
import base64
import numpy as np
import tensorflow as tf
import tensorflow.keras as keras


def readb64(data):
  encoded_data = data.split(',')[1]
  np_arr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
  image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
  image = cv2.resize(image, (224, 224))
  return image


def writeb64(data, ext):
  encoded_data = cv2.imencode(ext, data)[1]
  image = base64.b64encode(encoded_data).decode('ascii')

  return image


def unprocess_image(x):
  x -= x.mean()
  x /= (x.std() + keras.backend.epsilon())
  x *= 0.1

  x += 0.5
  x = np.clip(x, 0, 1)

  x *= 255
  if keras.backend.image_data_format() == 'channels_first':
    x = x.transpose((1, 2, 0))
  x = np.clip(x, 0, 255).astype('uint8')

  return x