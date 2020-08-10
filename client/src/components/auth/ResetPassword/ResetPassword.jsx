import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams, Link } from 'react-router-dom';
import logo from '../../../assets/logo-purple.svg';
import {
  content,
  form,
  input,
  password,
  button,
  subtitle,
  error,
  updatingButton,
  logoIcon,
} from './ResetPassword.module.scss';

import AuthContext from '../../../context/auth/authContext';
import { ResetPasswordSchema } from './ResetPasswordUtils';

const ResetPassword = () => {
  const authContext = useContext(AuthContext);
  const { updating, resetPassword } = authContext;
  const { token } = useParams();

  return (
    <div className={content}>
      <img alt='company logo' src={logo} className={logoIcon} />
      <h4 className={subtitle}>Reset your password</h4>
      <Formik
        initialValues={{
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          return resetPassword(token, values.password, values.passwordConfirm);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            <div>
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

              <button
                type='submit'
                disabled={isSubmitting}
                className={updating ? updatingButton : button}
              >
                {updating ? (
                  <span>Reseting Password...</span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
              <Link to='/'>Go to Home Page</Link>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
