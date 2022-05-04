import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import numpy as np
import tensorflow as tf
import tensorflow.keras as keras
import tensorflow.keras.applications.vgg16 as vgg16
import uvicorn
import urllib
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from .utils import ops_image, visualise

keras.backend.set_image_data_format('channels_last')
model = vgg16.VGG16(weights='imagenet', include_top=True)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_credentials=False,
  allow_methods=['*'],
  allow_headers=['*'],
)

@app.get('/health-check')
def healthcheck():
  return {'healthy': 'true'}

@app.post('/')
async def post_image(file: str = Form(...), layer_name: str = Form(...)):
  image = ops_image.readb64(file)
  image = keras.preprocessing.image.img_to_array(image)[None, ...]

  input = tf.keras.applications.vgg16.preprocess_input(image)

  top_fm = visualise.visualise_layers(model, input, layer_name, mode='all')

  top_image = np.concatenate((top_fm[layer_name][0], top_fm[layer_name][1]), axis=1)
  bot_image = np.concatenate((top_fm[layer_name][2], top_fm[layer_name][3]), axis=1)
  concat_image = np.concatenate((top_image, bot_image), axis=0)

  raw_image = ops_image.unprocess_image(concat_image)

  output = ops_image.writeb64(raw_image, '.jpg')

  return f'data:image/webp;base64,{urllib.parse.quote(output)}'


if __name__ == '__main__':
  import os
  print(os.getcwd())
  uvicorn.run('conv.app.main:app', host='0.0.0.0', port=3002, reload=True)
