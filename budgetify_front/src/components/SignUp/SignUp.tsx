import { useFormik, FormikTouched, FormikErrors } from 'formik';
import { FC, useCallback } from 'react';
import * as yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { Formik } from '../../helpers/types';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useDispatch } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { registerUser } from '../../helpers/state/authSlice';

import './SignUp.scss';

interface SignUpForm {  
    email: string;
    password: string;
}

interface SignUpFormik extends Formik {
    values: SignUpForm;
    touched: FormikTouched<SignUpForm>;
    errors: FormikErrors<SignUpForm>;
}

const schema = yup.object().shape({
	email: yup.string().email('The email format is incorrect!').required('Email is required!'),
	password: yup.string().required('Password is required!'),
});

const initialValues: SignUpForm = {
	email: '',
	password: '',
};

// toast.configure();

const SignUp: FC = () => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = useCallback(
		(data: any, { resetForm }: any) => {
			// dispatch(
			// 	registerUser({
			// 		user: {
			// 			email: data.email,
			// 			username: data.username,
			// 			password: data.password,
			// 		},
			// 	})
			// )
			// 	.then(unwrapResult)
			// 	.then((result) => {
			// 		toast.success('User created successfully!');
			// 		resetForm({ values: initialValue });
			// 		navigate(`/sign-in`);
			// 	})
			// 	.catch((error) => {
			// 		toast.error('User creation failed!');
			// 		console.log('Error message', error);
			// 	});
		},
        []
		// [dispatch, navigate]
	);

    const { handleSubmit, handleChange, handleBlur, values, touched, errors }: SignUpFormik = useFormik({
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit,
        initialValues
    });

	return (
		<div className="sign-up">
            <div className="title-wrapper">Sign up</div>
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

                <button className='submit-btn' type='submit'>Sign up</button>
            </form>
            <div className='custom-link' onClick={ () => navigate('/sign-in') }>Go to sign in</div>
		</div>
	);
};

export default SignUp;