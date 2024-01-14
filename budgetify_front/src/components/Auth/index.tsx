import { useFormik, FormikTouched, FormikErrors } from 'formik';
import { FC, useCallback, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from '../../helpers/types';
import { useLocation } from 'react-router-dom';

import { auth } from '../../helpers/state/authSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

import { useRegisterMutation, useLoginMutation } from '../../helpers/state/authApi';
import { toast } from 'react-toastify';

import './Auth.scss';

interface AuthForm {
    email: string;
    password: string;
}

interface AuthFormik extends Formik {
    values: AuthForm;
    touched: FormikTouched<AuthForm>;
    errors: FormikErrors<AuthForm>;
}

const validationSchema = yup.object().shape({
	email: yup.string().email('Format is wrong!').required('Email is required!'),
	password: yup.string().required('Password is required!'),
});

const initialValues: AuthForm = {
	// email: 'aysel.mikayilova@gmail.com',
	// password: 'ayselMika77',
	email: '',
	password: '',
};

const SignIn: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const { pathname } = useLocation();

    const [ showPassword, setShowPassword ] = useState<boolean>(false)

    const [ registerUser ] = useRegisterMutation()
    const [ loginUser ] = useLoginMutation()

	const onSubmit = useCallback(
        (data: any, { resetForm }: any) => {
           
            if ( pathname === '/sign-in') {

                loginUser(data)
                    .unwrap()
                    .then( res => {
                        toast.success('User logged in successfully!')
                        dispatch(auth(res))
                        resetForm()
                        navigate('/transactions')
                    })
                    .catch( error => {
                        toast.error(`${error.data.message}`)
                    })

            } else {
                registerUser(data)
                    .unwrap()
                    .then( res => {
                        toast.success('User created successfully!')
                        resetForm()
                        navigate('/sign-in')
                    })
                    .catch( error => {
                        toast.error(`${error.data.message}`)
                    })
            }

		}, [dispatch, navigate, pathname, loginUser, registerUser]
	);

    const handleNavigate = () => {
        if ( pathname === '/sign-in') navigate('/sign-up')
        else navigate('/sign-in')
    }

    const { handleSubmit, handleChange, handleBlur, values, touched, errors }: AuthFormik = useFormik({ validationSchema, onSubmit, initialValues, enableReinitialize: true });

	return (
		<div className="auth">
            <div className="title-wrapper">{ pathname === '/sign-in' ? 'Sign in' : 'Sign up' }</div>
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
                    <div className="form-control-error">{ touched.email && !!errors.email && errors.email }</div>
                </div>

                <div className="input-wrapper">
                    <div className={['form-control password', touched.password && !errors.password ? 'valid' : '', touched.password && !!errors.password ? 'invalid' : '' ].join(' ')}>
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input 
                            type={ showPassword ? 'text' : 'password' }
                            name='password' 
                            placeholder='Password' 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} 
                            className='input'
                            required 
                        />
                        <div className='show-password-icon' onClick={ () => setShowPassword(!showPassword) }>
                            { showPassword ? <FontAwesomeIcon icon={faEyeSlash} className="icon" /> : <FontAwesomeIcon icon={faEye} className="icon" /> }
                        </div>
                    </div>
                    <div className="form-control-error">{ touched.password && !!errors.password && errors.password }</div>
                </div>

                <div className='btns'>
                    <button className='submit-btn' type='submit'>{ pathname === '/sign-in' ? 'Sign in' : 'Sign up' }</button>
                    <button className='link-btn' onClick={handleNavigate} type='button'>Go to { pathname === '/sign-in' ? 'sign up' : 'sign in' }</button>
                </div>
            </form>
            
		</div>
	);
};

export default SignIn;
