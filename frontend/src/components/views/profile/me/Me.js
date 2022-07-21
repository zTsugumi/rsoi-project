import Admin from './admin/Admin';
import User from './user/User';

function Me(props) {
  return props.info.role === 'admin' ? <Admin /> : <User />;
}

export default Me;
