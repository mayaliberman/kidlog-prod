import React, { useContext, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  form,
  input,
  button,
  error,
  formSecondPart,
  cancelButton,
  avatar,
} from './KidForm.module.scss';
import { getUser } from '../../../../services/cookies';
import UserContext from '../../../../context/user/userContext';
const KidForm = (props) => {
  const userContext = useContext(UserContext);
  const { createChild, isUpdated, child, updateChild } = userContext;
  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [isUpdated, child, user]);
  if (!user) {
    return <div>Loading</div>;
  } else {
    return (
      <Formik
        initialValues={
          props.childValue
            ? {
                name: props.childValue.name,
                birthYear: props.childValue.birthYear,
                gender: props.childValue.gender,
              }
            : {
                name: '',
                birthYear: '',
                gender: '',
              }
        }
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .matches(/[a-zA-Z]/, 'Please write only letters without numbers')
            .required('* Name is Required'),
          birthYear: Yup.number()
            .max(new Date().getFullYear())
            .required('* Birth year is Required'),
          gender: Yup.string()
            .oneOf(['male', 'female', 'other'], 'Invalid Gender Type')
            .required('* Gender is Required'),
        })}
        onSubmit={async (values) => {
          const requestBody = {
            name: values.name,
            birthYear: values.birthYear,
            gender: values.gender,
            user: user.id,
          };
          if (child.length > 0) {
            requestBody.id = child[0].id;

            await updateChild(requestBody);
          } else {
            await createChild(requestBody);
          }
          props.cancel();
        }}
      >
        <Form className={form}>
          <div className={avatar}></div>
          <ErrorMessage
            name='name'
            render={(msg) => <div className={error}>{msg}</div>}
          />

          <label htmlFor='name'>First Name</label>
          <Field name='name' type='text' className={input} />
          <div>
            <div className={formSecondPart}>
              <ErrorMessage
                name='birthYear'
                render={(msg) => <div className={error}>{msg}</div>}
              />
              <label htmlFor='birthYear'>Birth Year</label>
              <Field
                name='birthYear'
                type='number'
                // placeholder='Last Name'
                className={input}
              />
            </div>
            <div className={formSecondPart}>
              <ErrorMessage
                name='gender'
                render={(msg) => <div className={error}>{msg}</div>}
              />

              <label htmlFor='gender'>Gender</label>
              <Field name='gender' as='select' className={input} default>
                <option value=''>Select a gender</option>
                <option value='female'>Femle</option>
                <option value='male'>Male</option>
                <option value='other'>Other</option>
              </Field>
            </div>
          </div>
          <button type='submit' className={button}>
            Update
          </button>
          <button onClick={props.cancel} className={cancelButton}>
            Cancel
          </button>
        </Form>
      </Formik>
    );
  }
};
export default KidForm;
