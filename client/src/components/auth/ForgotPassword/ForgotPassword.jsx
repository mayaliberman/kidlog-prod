import React, { useContext, useState, useEffect } from 'react';
import {
  content,
  form,
  input,
  errorMessage,
  button,
  redirect,
  messageSent,
} from './ForgotPassword.module.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import logo from '../../../assets/Logo_white_splash.svg';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please add your email'),
});

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const authContext = useContext(AuthContext);
  const { error, forgotPassword, clearErrors } = authContext;
  useEffect(() => {
    if (error) {
      setTimeout(() => clearErrors(), 3500);
    }
  }, [error]);
  return (
    <div className={content}>
      <img alt='company logo' src={logo} />
      <h3>Please write your email to reset your password via email</h3>
      {emailSent ? (
        <div className={messageSent}>
          Please check your email for you new password
        </div>
      ) : null}
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={async (values, { resetForm }) => {
          const res = await forgotPassword(values.email);
          if (res) {
            setEmailSent(true);
          }
          resetForm({});
        }}
      >
        {({ errors, touched, isSubmitting, handleChange }) => (
          <Form className={form}>
            {error ? <div className={errorMessage}>{error}</div> : null}
            <Field
              placeholder='Email'
              name='email'
              className={input}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div
              className={
                errors.email && touched.email && errors.email
                  ? errorMessage
                  : null
              }
            >
              {errors.email && touched.email && errors.email}
            </div>
            <button type='submit' disabled={isSubmitting} className={button}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <Link className={redirect} to='/'>
        <span>Return to home page</span>
      </Link>
    </div>
  );
};

export default ForgotPassword;
