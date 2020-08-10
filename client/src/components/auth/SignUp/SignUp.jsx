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

const SignUp = () => {
  const authContext = useContext(AuthContext);

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
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          return authContext.signup(
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.passwordConfirm
          );
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            <div>
              <div
                className={error}
                style={{
                  display:
                    errors.firstName && touched.firstName && errors.firstName
                      ? 'block'
                      : 'none',
                }}
              >
                {errors.firstName && touched.firstName && errors.firstName}
              </div>
              <div
                className={error}
                style={{
                  display:
                    errors.lastName && touched.lastName && errors.lastName
                      ? 'block'
                      : 'none',
                }}
              >
                {errors.lastName && touched.lastName && errors.lastName}
              </div>
              <div
                className={error}
                style={{
                  display:
                    errors.email && touched.email && errors.email
                      ? 'block'
                      : 'none',
                }}
              >
                {errors.email && touched.email && errors.email}
              </div>
              <div
                className={error}
                style={{
                  display:
                    errors.password && touched.password && errors.password
                      ? 'block'
                      : 'none',
                }}
              >
                {errors.password && touched.password && errors.password}
              </div>
              <div
                className={error}
                style={{
                  display:
                    errors.passwordConfirm &&
                    touched.passwordConfirm &&
                    errors.passwordConfirm
                      ? 'block'
                      : 'none',
                }}
              >
                {errors.passwordConfirm &&
                  touched.passwordConfirm &&
                  errors.passwordConfirm}
              </div>
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
              <button type='submit' disabled={isSubmitting} className={button}>
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
