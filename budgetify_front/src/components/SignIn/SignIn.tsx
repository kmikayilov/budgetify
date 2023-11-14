import React, { useCallback } from 'react';
import { useFormik, FormikTouched, FormikErrors } from 'formik';
import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// import { toast } from 'react-toastify';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { loginUser } from '../../helpers/state/authSlice';

// import { Box, Button, FormHelperText, Grid, Typography, TextField } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import { LinkContainer } from 'react-router-bootstrap';

import './SignIn.scss';

interface SignInForm {  
    email: string;
    password: string;
}

interface SignInFormik {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    };
    handleBlur: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
    values: SignInForm;
    touched: FormikTouched<SignInForm>;
    errors: FormikErrors<SignInForm>;
}

const schema = yup.object().shape({
	email: yup.string().email('Format is wrong!').required('Email is required!'),
	password: yup.string().required('Password is required!'),
});

const initialValues = {
	// email: 'kenan.mikayilov.00@gmail.com',
	// password: 'KM_jr2000',
	email: '',
	password: '',
};

const SignIn: React.FC = () => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();

    
	const onSubmit = useCallback(
        (data: any, { resetForm }: any) => {
            console.log(data, resetForm)
	// 		dispatch(
	// 			loginUser({
	// 				user: {
	// 					email: data.email,
	// 					password: data.password,
	// 				},
	// 			})
	// 		)
	// 			.then(unwrapResult)
	// 			.then((result) => {
	// 				toast.success('User logged successfully!');
	// 				navigate(`/transactions`);
	// 			})
	// 			.catch((error) => {
	// 				toast.error(error && error.message);
	// 			});
		},
        []
	// 	[dispatch, navigate]
	);

    const { handleSubmit, handleChange, handleBlur, values, touched, errors }: SignInFormik = useFormik({
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit,
        initialValues
    })

	return (
		<div className="sign-in">
            <div className="title-wrapper">Sign in</div>
            <form
                className="form"
                noValidate
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div className="input-wrapper">
                    <div className={['form-control', touched.email && !errors.email ? 'valid' : '', touched.email && !!errors.email ? 'invalid' : '' ].join(' ')}>
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input 
                            type='email' 
                            name='email' 
                            placeholder='Email' 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            value={values.email} 
                            className='input'
                            required 
                        />
                    </div>
                    <div className="form-control-error">
                        {
                            touched.email && !!errors.email && errors.email
                        }
                    </div>
                </div>

                <div className="input-wrapper">
                    <div className={['form-control', touched.password && !errors.password ? 'valid' : '', touched.password && !!errors.password ? 'invalid' : '' ].join(' ')}>
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input 
                            type='text'
                            name='password' 
                            placeholder='Password' 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} 
                            className='input'
                            required 
                        />
                    </div>
                    <div className="form-control-error">
                        {
                            touched.password && !!errors.password && errors.password
                        }
                    </div>
                </div>

                <button className='submit-btn' type='submit'>Sign in</button>
            </form>
		</div>
	);
};

export default SignIn;
