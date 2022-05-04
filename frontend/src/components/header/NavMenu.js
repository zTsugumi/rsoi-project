import { Link } from 'react-router-dom';

function NavMenu(props) {
  return (
    <div>
      <div className='font-bold'>Menu</div>
      <ul>
        <li>
          <Link
            to='/'
            className='text-blue-500 py-3 border-t border-b block'
            onClick={props.closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/deconv'
            className='text-blue-500 py-3 border-t border-b block'
            onClick={props.closeMenu}
          >
            Deconv
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavMenu;
