import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { message } from 'antd';
import { URL_GW } from '../shared/config';
import WSContext from './WebSocketContext';
import AllActions from '../redux/actions/allActions';

const WSProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isLoading && !socket) {
      const options = {
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        timeout: 1000,
        withCredentials: true,
      };

      setSocket(io(URL_GW, options));
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on('msg-to-client', (msg) => {
        dispatch(AllActions.ChatActions.chatRecv(msg));
      });

      socket.on('error', (msg) => {
        message.error(msg.message);
      });
    }

    return () => {
      if (socket) {
        socket.off('msg-to-client');
        socket.off('error');
      }
    };
  }, [socket, dispatch]);

  const sendMsg = (msg) => {
    // WIP: Do encrypt here
    if (socket) {
      socket.emit('msg-to-server', msg);
    }
  };

  const joinRoom = (room) => {
    if (socket) {
      dispatch(AllActions.RoomActions.joinRoomRequest());
      socket.emit('join-room', room, (res) => {
        if (res === 'joined-room') {
          dispatch(AllActions.RoomActions.joinRoomSuccess());
        } else {
          dispatch(AllActions.RoomActions.joinRoomError());
        }
      });
    }
  };

  const leaveRoom = (room) => {
    if (socket) {
      dispatch(AllActions.RoomActions.leaveRoomRequest());
      socket.emit('leave-room', room, (res) => {
        if (res === 'left-room') {
          dispatch(AllActions.RoomActions.leaveRoomSuccess());
        } else {
          dispatch(AllActions.RoomActions.leaveRoomError());
        }
      });
    }
  };

  return (
    <WSContext.Provider value={{ socket, sendMsg, joinRoom, leaveRoom }}>
      {children}
    </WSContext.Provider>
  );
};

export default WSProvider;
