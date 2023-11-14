import React, { useCallback } from 'react';
import { Formik } from 'formik';
// import { schema, initialValue } from './schema';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Box, Button, FormHelperText, Grid, Typography, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useDispatch } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { registerUser } from '../../helpers/state/authSlice';

import './SignUp.scss';

const initialValue = {
	email: '',
	username: '',
	password: '',
};


// toast.configure();

const SignUp = () => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();

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
	return (
		<>
			<div className="sign-in">
				<Box className="auth-modal">
					<div className="title-wrapper">
						<div className="custom-col">
							<div className="custom-row">
								<Typography variant="h4">Sign up</Typography>
							</div>
							<div className="custom-row">
								<Typography variant="h6">Sign up on the platform</Typography>
							</div>
						</div>
						<div className="custom-col">
							<AccountBalanceIcon />
						</div>
					</div>
					<Formik
						// validationSchema={schema}
						onSubmit={onSubmit}
						initialValues={initialValue}
						enableReinitialize={true}>
						{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
							return (
								<form
									className="form"
									noValidate
									onSubmit={handleSubmit}
									autoComplete="off">
									<Grid
										style={{ marginBottom: '30px' }}
										container
										spacing={1}
										direction="row"
										justifyContent="center">
										<Grid container spacing={1} alignItems="center">
											<Grid item>
												<EmailIcon className="icon" />
											</Grid>
											<Grid item xs={11}>
												<TextField
													name="email"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													label="Email"
													required
													variant="outlined"
													className={[
														'input-wrapper',
														touched.email &&
															!errors.email &&
															'valid',
													].join(' ')}
													fullWidth
													error={touched.email && !!errors.email}
												/>
											</Grid>
										</Grid>
										<Grid item>
											{touched.email && !!errors.email && (
												<FormHelperText>
													{errors.email}
												</FormHelperText>
											)}
										</Grid>
									</Grid>
									<Grid
										style={{ marginBottom: '30px' }}
										container
										spacing={1}
										direction="row"
										justifyContent="center">
										<Grid container spacing={1} alignItems="center">
											<Grid item>
												<AccountCircle className="icon" />
											</Grid>
											<Grid item xs={11}>
												<TextField
													name="username"
													value={values.username}
													onChange={handleChange}
													onBlur={handleBlur}
													label="Username"
													required
													variant="outlined"
													className={[
														'input-wrapper',
														touched.username &&
															!errors.username &&
															'valid',
													].join(' ')}
													fullWidth
													error={
														touched.username &&
														!!errors.username
													}
												/>
											</Grid>
										</Grid>
										<Grid item>
											{touched.username && !!errors.username && (
												<FormHelperText>
													{errors.username}
												</FormHelperText>
											)}
										</Grid>
									</Grid>
									<Grid container spacing={1} justifyContent="center">
										<Grid container spacing={1} alignItems="center">
											<Grid item>
												<LockIcon className="icon" />
											</Grid>
											<Grid item xs={11}>
												<TextField
													type="password"
													name="password"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
													label="Password"
													required
													variant="outlined"
													className={[
														'input-wrapper',
														touched.password &&
															!errors.password &&
															'valid',
													].join(' ')}
													fullWidth
													error={
														touched.password &&
														!!errors.password
													}
												/>
											</Grid>
										</Grid>
										<Grid item>
											{touched.password && !!errors.password && (
												<FormHelperText>
													{errors.password}
												</FormHelperText>
											)}
										</Grid>
									</Grid>
									<Button
										className="btn"
										fullWidth
										variant="contained"
										color="primary"
										type="submit">
										Sign up
									</Button>
								</form>
							);
						}}
					</Formik>
					<Box style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-start' }}>
						{/* <LinkContainer to="/sign-in" className="link">
							<Typography variant="subtitle1">Sign in</Typography>
						</LinkContainer> */}
					</Box>
				</Box>
				);
			</div>
		</>
	);
};

export default SignUp;
