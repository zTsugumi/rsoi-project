import { useState } from 'react';
import { Typography, Row, Col } from 'antd';
import axios from 'axios';
import Cam from './Cam';
import ProcessedImage from './ProcessedImage';
import './Conv.css';

const { Title } = Typography;

function Conv() {
  const [layerList] = useState([
    'block1_conv1',
    'block1_conv2',
    'block1_pool',
    'block2_conv1',
    'block2_conv2',
    'block2_pool',
    'block3_conv1',
    'block3_conv2',
  ]);
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
    formData.append('layer_name', selectedLayer);

    axios({
      method: 'post',
      url: 'http://localhost:3002',
      data: formData,
      config: {
        headers: {
          'Content-Type': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': true,
        },
      },
    })
      .then((response) => {
        captureImage({ captured: true, image: response.data, loading: false, error: false });
      })
      .catch((error) => {
        captureImage({ captured: false, image: null, loading: false, error: true });
      });
  };

  return (
    <div className='app'>
      <Title level={2}>Convolution</Title>
      <Row gutter={16}>
        <Col span={18}>Convolutional view of live webcam</Col>
        <Col span={6}>
          <select value={layerList.find((obj) => obj === selectedLayer)} onChange={handleChange}>
            {layerList.map((layer) => (
              <option key={layer} value={layer}>
                {layer}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row gutter={16} className='convbox'>
        <Col span={12} className='convbox__item'>
          <Cam onCapture={handleCapture} />
        </Col>
        <Col span={12} className='convbox__item'>
          <ProcessedImage {...capturedImage} initLabel='The processed image will be here' />
        </Col>
      </Row>
    </div>
  );
}

export default Conv;
