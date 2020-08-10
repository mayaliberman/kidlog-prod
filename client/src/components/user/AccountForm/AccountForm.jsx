import React, { useContext, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  form,
  input,
  button,
  error,
  buttonUpdating,
} from './AccountForm.module.scss';
import UserContext from '../../../context/user/userContext';
import { getUser } from '../../../services/cookies';
const AccountForm = () => {
  const userContext = useContext(UserContext);
  const { loading, updateUser, isUpdated } = userContext;
  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [isUpdated, loading]);

  if (isUpdated) {
    return <div>Loading</div>;
  } else {
    return (
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('* First Name is Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('* Last Name is Required'),
          email: Yup.string()
            .email('* Invalid Email Address')
            .required('* Email is Required'),
        })}
        onSubmit={async (values) => {
          const requestBody = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          };
          updateUser(requestBody);

          getUser();
        }}
      >
        <Form className={form}>
          <ErrorMessage
            name='firstName'
            render={(msg) => <div className={error}>{msg}</div>}
          />

          <label htmlFor='firstName'>First Name</label>
          <Field
            name='firstName'
            type='text'
            className={input}
            placeholder={user.firstName}
          />
          <ErrorMessage
            name='lastName'
            render={(msg) => <div className={error}>{msg}</div>}
          />
          <label htmlFor='lastName'>Last Name</label>
          <Field
            name='lastName'
            type='text'
            placeholder='Last Name'
            className={input}
          />
          <ErrorMessage
            name='email'
            render={(msg) => <div className={error}>{msg}</div>}
          />
          <label htmlFor='email'>Email Address</label>
          <Field
            name='email'
            type='email'
            placeholder='Email'
            className={input}
          />
          <button type='submit' className={loading ? buttonUpdating : button}>
            {loading ? <span>Updating...</span> : <span>Update</span>}
          </button>
        </Form>
      </Formik>
    );
  }
};

export default AccountForm;
