import * as Yup from 'yup';
export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password needs at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
