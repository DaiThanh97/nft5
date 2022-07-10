import * as yup from 'yup';

export const validationLogin = yup.object({
    username: yup
        .string('Enter your username')
        .min(4, 'Username must between 4 and 20 characters')
        .max(20, 'Username must between 4 and 20 characters')
        .matches(/^\S+$/, 'Username must not have whitespace')
        .required('*Username is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password must between 6 and 18 characters')
        .max(18, 'Password must between 6 and 18 characters')
        .required('*Password is required'),
});

export const validationSignup = yup.object({
    name: yup
        .string('Enter your name')
        .min(4, 'Name must between 4 and 20 characters')
        .max(20, 'Name must between 4 and 20 characters')
        .matches(/^\S+$/, 'Username must not have whitespace')
        .required('*Username is required'),
    username: yup
        .string('Enter your username')
        .min(4, 'Username must between 4 and 20 characters')
        .max(20, 'Username must between 4 and 20 characters')
        .matches(/^\S+$/, 'Username must not have whitespace')
        .required('*Username is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password must between 6 and 18 characters')
        .max(18, 'Password must between 6 and 18 characters')
        .required('*Password is required'),
    rePassword: yup.string('Enter confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const validationShare = yup.object({
    urls: yup
        .string('Enter your Youtube url')
        .required('*Youtube url is required'),
});