import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function Header() {
  return (
    <header className='border-b p-3 flex justify-between item-center'>
      <Link to='/' className='font-bold'>
        Test
      </Link>

      <NavBar />
    </header>
  );
}

export default Header;
