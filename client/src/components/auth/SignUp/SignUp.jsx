import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  content,
  form,
  input,
  password,
  button,
  subtitle,
  logoIcon,
  error,
} from './SignUp.module.scss';
import logo from '../../../assets/logo-purple.svg';
import AuthContext from '../../../context/auth/authContext';
import { SignUpSchema } from './SignUpUtils';
import ReCAPTCHA from 'react-google-recaptcha';

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  return (
    <div className={content}>
      <img alt='company logo' src={logo} className={logoIcon} />
      <h4 className={subtitle}>Sign up to create your Kidlog account</h4>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          recaptcha: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          return authContext.signup(
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.passwordConfirm,
            values.recaptcha
          );
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <>
            <div>
              {Object.keys(errors).map((item) => {
                return (
                  <div
                    key={item}
                    className={error}
                    style={{
                      display:
                        errors[item] && touched[item] && errors[item]
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {errors[item] && touched[item] && errors[item]}
                  </div>
                );
              })}
            </div>
            <Form className={form}>
              <Field
                name='firstName'
                placeholder='First Name'
                className={input}
              />
              <Field
                name='lastName'
                placeholder='Last Name'
                className={input}
              />
              <Field name='email' placeholder='Email' className={input} />
              <Field
                type='password'
                name='password'
                placeholder='Password'
                className={[input, password].join(' ')}
              />
              <Field
                type='password'
                name='passwordConfirm'
                placeholder='Confirm Password'
                className={[input, password].join(' ')}
              />
              <ReCAPTCHA
                style={{ marginTop: '20px' }}
                sitekey={siteKey}
                onChange={(e) => {
                  setFieldValue('recaptcha', e);
                }}
                size={'normal'}
              />
              <button type='submit' className={button}>
                Submit
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
