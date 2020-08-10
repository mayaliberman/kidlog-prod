import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import {
  content,
  form,
  input,
  password,
  button,
  subtitle,
  error,
  cancelButton,
  forgotPassword,
  updatingButton,
} from './UpdatePassword.module.scss';

import AuthContext from '../../../context/auth/authContext';
import { UpdatePasswordSchema } from './UpdatePasswordUtils';

const UpdatePassword = () => {
  const authContext = useContext(AuthContext);
  const { updating } = authContext;
  return (
    <div className={content}>
      <h4 className={subtitle}>Update your password</h4>
      <Formik
        initialValues={{
          passwordCurrent: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={(values) => {
          return authContext.updatePassword(
            values.passwordCurrent,
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
                    errors.passwordCurrent &&
                    touched.passwordCurrent &&
                    errors.passwordCurrent
                      ? 'block'
                      : 'none',
                }}
              >
                {errors.passwordCurrent &&
                  touched.passwordCurrent &&
                  errors.passwordCurrent}
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
                type='password'
                name='passwordCurrent'
                placeholder='Your Current Password'
                className={[input, password].join(' ')}
              />
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
              <Link to='/forgot-password' className={forgotPassword}>
                Forgot Password?
              </Link>
              <button
                type='submit'
                disabled={isSubmitting}
                className={updating ? updatingButton : button}
              >
                {updating ? (
                  <span>Updating Password...</span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
              <Link to='my-account'>
                <button className={cancelButton}>Cancel</button>
              </Link>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;
