import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';
import AllActions from '../../../../redux/actions/allActions';
import './Room.css';

function Room() {
  const room = useSelector((state) => state.room);
  const defaultPagination = useRef({
    page: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllActions.RoomActions.roomGet(defaultPagination.current));
  }, [dispatch, defaultPagination]);

  const onChange = (page, pageSize) => {
    const pagination = {
      page: page,
      pageSize: pageSize,
    };
    dispatch(AllActions.RoomActions.roomGet(pagination));
  };

  return (
    <List
      className='roombox__list'
      header={<h3>Rooms</h3>}
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
        onChange: onChange,
        position: 'bottom',
      }}
      dataSource={room.rooms.items}
      renderItem={(item) => (
        <List.Item key={item.uuid}>
          <List.Item.Meta title={item.name} description={item.description} />
        </List.Item>
      )}
    />
  );
}

export default Room;
