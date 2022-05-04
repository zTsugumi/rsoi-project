import { useState } from 'react';
import Cam from './Cam';
import ProcessedImage from './ProcessedImage';

function Conv() {
  const [layerList] = useState(['block1_conv1', 'block1_conv2', 'block1_pool']);
  const [selectedLayer, selectLayer] = useState('block1_conv1');
  const [capturedImage, captureImage] = useState({
    captured: false,
    image: null,
    loading: false,
    error: false,
  });

  const handleChange = (e) => {
    selectLayer(e.target.value);
  };

  const handleCapture = (image) => {
    captureImage({
      captured: false,
      image: null,
      loading: true,
      error: null,
    });

    let file = image;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('layer', selectedLayer);

    // WIP: Send data to backend and show the processed data
    captureImage({ captured: true, image: image, loading: false, error: false });

    console.log(capturedImage);
  };

  return (
    <div className='grid text-center flex flex-col gap-4'>
      <h1 className='font-bold text-2xl mb-3'>Convolution</h1>
      <span className='inline-block'>
        <p>Convolutional view of live webcam</p>
        <select value={layerList.find((obj) => obj === selectedLayer)} onChange={handleChange}>
          {layerList.map((layer) => (
            <option key={layer} value={layer}>
              {layer}
            </option>
          ))}
        </select>
      </span>
      <div className='grid grid-cols-2 gap-4'>
        <Cam onCapture={handleCapture} />
        <ProcessedImage {...capturedImage} initLabel='The processed image will be here' />
      </div>
    </div>
  );
}

export default Conv;
