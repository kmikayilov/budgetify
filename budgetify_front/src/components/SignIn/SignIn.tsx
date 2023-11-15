import { useFormik, FormikTouched, FormikErrors } from 'formik';
import React, { useCallback } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Formik } from '../../helpers/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// import { toast } from 'react-toastify';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { loginUser } from '../../helpers/state/authSlice';

import './SignIn.scss';

interface SignInForm {  
    email: string;
    password: string;
}

interface SignInFormik extends Formik {
    values: SignInForm;
    touched: FormikTouched<SignInForm>;
    errors: FormikErrors<SignInForm>;
}

const schema = yup.object().shape({
	email: yup.string().email('Format is wrong!').required('Email is required!'),
	password: yup.string().required('Password is required!'),
});

const initialValues: SignInForm = {
	// email: 'kenan.mikayilov.00@gmail.com',
	// password: 'KM_jr2000',
	email: '',
	password: '',
};

const SignIn: React.FC = () => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

    
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
    });

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
            <div className='custom-link' onClick={ () => navigate('/sign-up') }>Go to sign up</div>
		</div>
	);
};

export default SignIn;
