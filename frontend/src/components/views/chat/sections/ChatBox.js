import { useState } from 'react';
import { Input, Row, Col, Typography, Button, Empty, Comment, Tooltip, message } from 'antd';
import { MessageOutlined, EnterOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { ChatFeed } from 'react-chat-ui';
import moment from 'moment';
import { Loading } from '../../../loading/Loading';
import UserModal from './UserModal';
import './ChatBox.css';

const { Title } = Typography;

function ChatBox(props) {
  const { curRoom, ws } = props;
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const [chatMsg, setChatMsg] = useState('');
  const [userModalInfo, setUserModalInfo] = useState({
    isVisible: false,
    userUUID: null,
    position: [0, 0],
  });

  const handleUserClick = (e, userUUID) => {
    setUserModalInfo({
      isVisible: true,
      userUUID: userUUID,
      position: [e.pageX, e.pageY],
    });
  };

  const handleSubmitChat = () => {
    if (!user.creds) {
      message.error('Unauthorized');
      setChatMsg(''); // WIP
      return;
    }

    if (!chatMsg) return;

    var msg = {
      content: chatMsg,
      roomUUID: curRoom ?? null,
      userUUID: user?.creds?.uuid ?? null,
      type: 'text',
      atTime: moment(),
    };

    ws.sendMsg(msg);

    setChatMsg('');
  };

  const customBubble = (props) => (
    <div style={{ width: '100%' }}>
      <Comment
        author={
          <button
            type='button'
            className='link-button'
            onClick={(e) => handleUserClick(e, props.message.userUUID)}
          >
            {props.message.senderName}
          </button>
        }
        // author={<b>{props.message.senderName}</b>}
        content={<p>{props.message.content}</p>}
        datetime={
          <Tooltip title={moment(props.message.atTime).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(props.message.atTime).fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );

  return curRoom ? (
    chat.isLoading ? (
      <div className='chatbox-list'>
        <Loading />
      </div>
    ) : (
      <div className='chatbox-list'>
        <Row className='chatbox-header'>
          <Title level={4}>Chat Box</Title>
        </Row>
        <Row className='chatbox-body'>
          <ChatFeed chatBubble={customBubble} messages={chat.msgs} />
        </Row>
        <Row className='chatbar'>
          <Col span={22}>
            <Input
              id='msg'
              prefix={<MessageOutlined className='chat__icon_color' />}
              placeholder="Let's start chatting"
              type='text'
              value={chatMsg}
              maxLength={20000}
              onPressEnter={handleSubmitChat}
              onChange={(e) => setChatMsg(e.target.value)}
            />
          </Col>
          <Col span={2}>
            <Button
              className='chat__button'
              type='primary'
              onClick={handleSubmitChat}
              htmlType='submit'
            >
              <EnterOutlined />
            </Button>
          </Col>
        </Row>
        <UserModal userModalInfo={userModalInfo} setUserModalInfo={setUserModalInfo} />
      </div>
    )
  ) : (
    <div className='chatbox-list'>
      <Empty description={<span>Welcome to ...! Please select a room to start chating!</span>} />
    </div>
  );
}

export default ChatBox;
