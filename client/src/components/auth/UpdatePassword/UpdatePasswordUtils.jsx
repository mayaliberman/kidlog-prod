import * as Yup from 'yup';
import axios from '../../../services/axios';
import { BASE_URL } from '../../../config';
export const UpdatePasswordSchema = Yup.object().shape({
  passwordCurrent: Yup.string()
    .test(
      'Your password is correct',
      'Your current password is not correct',
      function (value) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${BASE_URL}/users/validateCurrentPassword`, {
              passwordCurrent: value,
            })
            .then((res) => {
              if (res.data.status === 'failed') {
                resolve(false);
              }
              resolve(true);
            });
        });
      }
    )
    .required('Please add your current password'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
