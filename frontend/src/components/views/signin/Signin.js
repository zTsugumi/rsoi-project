import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Typography } from 'antd';
import { Form, FormItem, Input, SubmitButton, Checkbox } from 'formik-antd';
import * as Yup from 'yup';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Loading } from '../../loading/Loading';
import './Signin.css';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../../../redux/actions/allActions';

const { Title } = Typography;

function Signin() {
  const [formError, setFormError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();
  // const { user, signinUser } = props;

  // Run only 1 time after render
  useEffect(() => {
    if (localStorage.getItem('rememberData')) {
      setRememberMe(true);
    }
  }, []);

  // Effect for signin success reroute to main page
  useEffect(() => {
    if (user.logSuccess === true) {
      history.push('/');
    } else if (user.logSuccess === false) {
      setFormError("Sorry, we couldn't signin your account. Please check your information again!");
    }

    return () => {
      setFormError('');
    };
  }, [user.logSuccess, history]);

  const signinValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleOnSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    const creds = {
      email: values.email,
      password: values.password,
    };

    // Set remember data
    if (values.rememberMe) {
      localStorage.setItem('rememberData', JSON.stringify(creds));
    } else {
      localStorage.removeItem('rememberData');
    }

    dispatch(AllActions.UserActions.signinUser(creds));

    actions.setSubmitting(false);
  };

  if (user.isLoading) {
    return (
      <div className='app'>
        <Loading />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        email: localStorage.getItem('rememberData')
          ? JSON.parse(localStorage.getItem('rememberData')).email
          : '',
        password: localStorage.getItem('rememberData')
          ? JSON.parse(localStorage.getItem('rememberData')).password
          : '',
      }}
      validationSchema={signinValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {(props) => (
        <div className='app'>
          <Title level={2}>Log In</Title>
          <Form className='form'>
            <FormItem className='form__item' name='emailItem' required={true}>
              <Input
                name='email'
                prefix={<UserOutlined className='form__icon_color' />}
                placeholder='Enter your email'
              />
            </FormItem>
            <FormItem className='form__item' name='password' required={true}>
              <Input.Password
                name='password'
                prefix={<LockOutlined className='form__icon_color' />}
                placeholder='Enter your password'
              />
            </FormItem>
            {formError && (
              <label>
                <p className='form__item form__error'>{formError}</p>
              </label>
            )}
            <div>
              <Checkbox
                name='rememberMe'
                onChange={() => setRememberMe(!rememberMe)}
                checked={rememberMe}
              >
                Remember me
              </Checkbox>
              <Link to='/reset_user' style={{ float: 'right' }}>
                Forgot password
              </Link>
            </div>
            <div className='form__item_1'>
              <SubmitButton className='signin-form-button'>Log in</SubmitButton>
              <Link to='/signup'>Register now!</Link>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Signin;
