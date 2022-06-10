/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { Loading } from '../../loading/Loading';

function RightMenu(props) {
  const { user, signoutUser } = props;
  const [formLoading, setFormLoading] = useState(user.isLoading);

  // Effect for loading
  useEffect(() => {
    setFormLoading(user.isLoading);

    return () => {
      setFormLoading(user.isLoading);
    };
  }, [user.isLoading]);

  if (formLoading) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='loading'>
          <Loading />
        </Menu.Item>
      </Menu>
    );
  } else {
    if (user.creds) {
      return (
        <Menu mode={props.mode}>
          {/* WIP */}
          <Menu.Item key='profile'>Logged in as {user.creds.firstName}</Menu.Item>
          <Menu.Item key='logout'>
            <a onClick={() => signoutUser()}>Sign out</a>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key='mail'>
            <Link to='/login'>Sign in</Link>
          </Menu.Item>
        </Menu>
      );
    }
  }
}

export default withRouter(RightMenu);
