import React, { useState } from 'react';
import { Drawer, Button, Divider } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../../redux/actions/allActions';
import './Header.css';
import LeftMenu from './sections/LeftMenu';
import RightMenu from './sections/RightMenu';

function Header(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const signoutUser = () => dispatch(AllActions.UserActions.signoutUser());

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='menu'>
      <div className='menu__logo'>
        <a href='/'>Logo</a>
      </div>
      <div className='menu__container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_right'>
          <RightMenu mode='horizontal' user={user} signoutUser={signoutUser} />
        </div>
        <Button className='menu__mobile-button' type='primary' onClick={showDrawer}>
          <AlignRightOutlined />
        </Button>
        <Drawer
          title='Menu'
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <Divider />
          <RightMenu mode='inline' user={user} signoutUser={signoutUser} />
        </Drawer>
      </div>
    </nav>
  );
}

export default Header;
