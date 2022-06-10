import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key='mail'>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item key='about'>
        <Link to='/about'>About</Link>
      </Menu.Item>
      <Menu.Item key='chat'>
        <Link to='/chat'>Chat</Link>
      </Menu.Item>
      <Menu.Item key='conv'>
        <Link to='/conv'>Conv</Link>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
