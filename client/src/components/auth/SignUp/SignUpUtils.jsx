import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../../config';
export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Please add first name'),
  lastName: Yup.string().required('Please add last name'),
  email: Yup.string()
    .email('Invalid email')
    .test('Unique Email', 'Email already in use', function (value) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}/users/validateEmail`, { email: value })
          .then((res) => {
            if (res.data.status === 'failed') {
              resolve(false);
            }
            resolve(true);
          });
      });
    })
    .required('Please add your email'),
  password: Yup.string()
    .min(8, 'Password needs at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please add password confrim'),
});
