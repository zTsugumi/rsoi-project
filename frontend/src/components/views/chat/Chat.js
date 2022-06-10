import { Col, Row } from 'antd';
import './Chat.css';
import Room from './sections/Room';

function Chat() {
  return (
    <div className='app'>
      <Row className='mainbox'>
        <Col span={9} className='roombox'>
          <Room />
        </Col>
        <Col span={15} className='chatbox'>
          Chat Box
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
