import { useState, useContext } from 'react';
import { Col, Row } from 'antd';
import Room from './sections/Room';
import ChatBox from './sections/ChatBox';
import WSContext from '../../../socket/WebSocketContext';
import './Chat.css';

function Chat() {
  const [curRoom, setCurRoom] = useState('');
  const ws = useContext(WSContext);

  return (
    <div className='app'>
      <Row className='mainbox'>
        <Col span={4} offset={1} className='roombox'>
          <Room curRoom={curRoom} setCurRoom={setCurRoom} ws={ws} />
        </Col>
        <Col span={17} offset={1} className='chatbox'>
          <ChatBox curRoom={curRoom} ws={ws} />
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
