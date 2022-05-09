import { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './components/views/about/About';
import Home from './components/views/home/Home';
import Conv from './components/views/convolution/Conv';
import Login from './components/views/login/Login';
import Register from './components/views/register/Register';
import AllActions from './redux/actions/allActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const signinUser = (creds) => dispatch(AllActions.UserActions.signinUser(creds));
  const signupUser = (creds) => dispatch(AllActions.UserActions.signupUser(creds));
  const signoutUser = () => dispatch(AllActions.UserActions.signoutUser());

  useEffect(() => {
    dispatch(AllActions.UserActions.authUser());
  }, [dispatch]);

  const AuthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          user.creds ? (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header user={user} signoutUser={signoutUser} />
      <div
        className='content_wrapper'
        style={{ paddingTop: '10px', minHeight: 'calc(100vh - 50px)' }}
      >
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute
            path='/login'
            component={() => <Login user={user} signinUser={signinUser} />}
          />
          <AuthRoute
            exact
            path='/signup'
            component={() => <Register user={user} signupUser={signupUser} />}
          />
          <Route path='/about' component={About} />
          <Route path='/conv' component={Conv} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default withRouter(App);
