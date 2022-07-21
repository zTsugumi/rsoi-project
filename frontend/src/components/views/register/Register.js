import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Typography } from 'antd';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../../../redux/actions/allActions';
import { Loading } from '../../loading/Loading';
import './Register.css';

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 16 },
  },
};

function Register() {
  const [formError, setFormError] = useState('');
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.regSuccess === true) {
      history.push('/signin');
    } else if (user.regSuccess === false) {
      setFormError(`Sorry, we couldn't register your account. ${user.errMess}.`);
    }

    return () => {
      setFormError('');
    };
  }, [user.regSuccess, user.errMess, history]);

  const signupValidationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleOnSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    const creds = {
      email: values.email,
      password: values.password,
      firstName: values.firstname,
      lastName: values.lastname,
    };

    dispatch(AllActions.UserActions.signupUser(creds));

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
        email: '',
        firtname: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signupValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {(props) => (
        <div className='app'>
          <Title level={2}>Sign up</Title>
          <Form {...formItemLayout} className='form'>
            <FormItem className='form__item' name='firstname' label='First Name' required={true}>
              <Input name='firstname' placeholder='Enter your First Name' />
            </FormItem>
            <FormItem className='form__item' name='lastname' label='Last Name' required={true}>
              <Input name='lastname' placeholder='Enter your Last Name' />
            </FormItem>
            <FormItem
              className='form__item'
              name='email'
              label='Email'
              required={true}
              hasFeedback={true}
              showValidateSuccess={true}
            >
              <Input name='email' placeholder='Enter your Email' />
            </FormItem>
            <FormItem
              className='form__item'
              name='password'
              label='Password'
              required={true}
              hasFeedback={true}
              showValidateSuccess={true}
            >
              <Input.Password name='password' placeholder='Enter your password' />
            </FormItem>
            <FormItem
              className='form__item'
              name='confirmPassword'
              label='Confirm'
              required={true}
              hasFeedback={true}
              showValidateSuccess={true}
            >
              <Input.Password name='confirmPassword' placeholder='Confirm your password' />
            </FormItem>
            {formError && (
              <label>
                <p className='form__item form__error'>{formError}</p>
              </label>
            )}
            <SubmitButton className='register-form-button'>Submit</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Register;
