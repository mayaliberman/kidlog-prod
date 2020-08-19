import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  content,
  form,
  input,
  password,
  button,
  forgotPassword,
  errorMessage,
} from './SignIn.module.scss';
import logo from '../../../assets/Logo_white_splash.svg';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please add your email'),
  password: Yup.string().required('No password provided.'),
});
const SignIn = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors } = authContext;

  useEffect(() => {
    if (error) {
      setTimeout(() => clearErrors(), 3500);
    }
  }, [error]);
  return (
    <div className={content}>
      <img alt='company logo' src={logo} />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={(values, { resetForm }) => {
          login(values.email, values.password);
          resetForm({});
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={form}>
            {error ? <div className={errorMessage}>{error}</div> : null}
            <Field placeholder='Email' name='email' className={input} />
            <div
              className={
                errors.email && touched.email && errors.email
                  ? errorMessage
                  : null
              }
            >
              {errors.email && touched.email && errors.email}
            </div>
            <Field
              type='password'
              name='password'
              placeholder='Password'
              className={[input, password].join(' ')}
            />

            <div
              className={
                errors.password && touched.password && errors.password
                  ? errorMessage
                  : null
              }
            >
              {errors.password && touched.password && errors.password}
            </div>

            <Link to='/forgot-password' className={forgotPassword}>
              Forgot Password?
            </Link>
            <button type='submit' disabled={isSubmitting} className={button}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
