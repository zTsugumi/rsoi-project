import { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './components/views/about/About';
import Home from './components/views/home/Home';
import Chat from './components/views/chat/Chat';
import Signin from './components/views/signin/Signin';
import Register from './components/views/register/Register';
import Profile from './components/views/profile/Profile';
import AllActions from './redux/actions/allActions';

function AuthRoute({ component: Component, ...rest }) {
  const creds = useSelector((state) => state.user.creds);
  return (
    <Route
      {...rest}
      render={(props) =>
        creds ? (
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
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllActions.UserActions.authUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <div
        className='content_wrapper'
        style={{ paddingTop: '70px', minHeight: 'calc(100vh - 10px)' }}
      >
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/signin' component={Signin} />
          <AuthRoute exact path='/signup' component={Register} />
          <Route path='/u/:userUUID' component={Profile} />
          <Route path='/about' component={About} />
          <Route path='/chat' component={Chat} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default withRouter(App);
