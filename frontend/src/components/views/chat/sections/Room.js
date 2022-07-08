import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Typography, message } from 'antd';
import AllActions from '../../../../redux/actions/allActions';
import './Room.css';

const { Title } = Typography;

function Room(props) {
  const { curRoom, setCurRoom, ws } = props;
  const room = useSelector((state) => state.room);
  const defaultPagination = useRef({
    page: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllActions.RoomActions.roomGet(defaultPagination.current));
  }, [dispatch, defaultPagination]);

  const handlePaginationChange = (page, pageSize) => {
    const pagination = {
      page: page,
      pageSize: pageSize,
    };
    dispatch(AllActions.RoomActions.roomGet(pagination));
  };

  const handleRoomClick = (item) => {
    if (curRoom) {
      ws.leaveRoom({ roomUUID: curRoom });
      // WIP: This part is wrong because it doesn't wait for ws.leaveRoom to complete
      if (room.leftRoom === false) {
        message.error('Leave room unsuccessful');
        return;
      }
    }

    ws.joinRoom({ roomUUID: item.uuid });
    // WIP: This part is also wrong
    if (room.joinedRoom === false) {
      message.error('Joined room unsuccessful');
      return;
    }

    setCurRoom(item.uuid);
    dispatch(AllActions.ChatActions.chatGet(item.uuid));
  };

  return (
    <List
      className='roombox-list'
      header={<Title level={4}>Rooms</Title>}
      itemLayout='vertical'
      loading={room.isLoading}
      size='small'
      pagination={{
        size: 'small',
        responsive: true,
        showLessItems: true,
        defaultCurrent: defaultPagination.page,
        defaultPageSize: defaultPagination.pageSize,
        total: room.rooms.totalElements,
        showSizeChanger: true,
        onChange: handlePaginationChange,
        position: 'bottom',
      }}
      dataSource={room.rooms.items}
      renderItem={(item) => (
        <List.Item key={item.uuid}>
          <List.Item.Meta
            title={
              <button type='button' className='link-button' onClick={() => handleRoomClick(item)}>
                {item.name}
              </button>
            }
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}

export default Room;
