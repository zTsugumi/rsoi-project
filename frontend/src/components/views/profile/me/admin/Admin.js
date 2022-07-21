import { useState } from 'react';
import { Empty, Layout, Menu } from 'antd';
import Statistic from './Statistic';
import MyProfile from './MyProfile';
import './Admin.css';

const { Sider, Content } = Layout;

function Admin() {
  const [currentKey, setCurrentKey] = useState('myprofile');

  const handleOnClick = (e) => {
    setCurrentKey(e.key);
  };

  return (
    <Layout style={{ width: '100%' }}>
      <Sider theme='light'>
        <Menu mode='inline' className='sidebar-menu' onClick={handleOnClick}>
          <Menu.Item key='myprofile'>Profile</Menu.Item>
          <Menu.Item key='statistic'>Statistic</Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {currentKey === 'myprofile' ? (
            <MyProfile />
          ) : currentKey === 'statistic' ? (
            <Statistic />
          ) : (
            <Empty description={<span>Not found</span>} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
