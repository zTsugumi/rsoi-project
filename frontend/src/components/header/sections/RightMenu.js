/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { Loading } from '../../loading/Loading';

function RightMenu(props) {
  const { user, signoutUser } = props;
  const [isUserLoading, setIsUserLoading] = useState(user.isLoading);

  // Effect for loading
  useEffect(() => {
    setIsUserLoading(user.isLoading);

    return () => {
      setIsUserLoading(user.isLoading);
    };
  }, [user.isLoading]);

  if (isUserLoading)
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='loading'>
          <Loading />
        </Menu.Item>
      </Menu>
    );

  if (!user.creds)
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <Link to='/signin'>Sign in</Link>
        </Menu.Item>
      </Menu>
    );

  if (props.mode === 'inline') {
    return (
      <Menu mode={props.mode}>
        {/* WIP */}
        <Menu.Item key='profile'>
          <Link to={`/u/${user.creds.uuid}`}>
            <Space>
              <UserOutlined />
              {`Signed in as ${user.creds.firstName}`}
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key='signout'>
          <a onClick={() => signoutUser()}>
            <Space>
              <LogoutOutlined />
              Sign out
            </Space>
          </a>
        </Menu.Item>
      </Menu>
    );
  } else {
    const profileMenu = (
      <Menu>
        <Menu.Item key='profile'>
          <Link to={`/u/${user.creds.uuid}`}>Your profile</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='help'>Help -- WIP</Menu.Item>
        <Menu.Item key='settings'>Settings -- WIP</Menu.Item>
        <Menu.Divider />
        <Menu.Item key='signout'>
          <a onClick={() => signoutUser()}>Sign out</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Menu mode={props.mode}>
        <Menu.Item key='profile_menu'>
          <Dropdown overlay={profileMenu} trigger={['click']} placement='bottomRight'>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined />
                {`Signed in as ${user.creds.firstName}`}
              </Space>
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
