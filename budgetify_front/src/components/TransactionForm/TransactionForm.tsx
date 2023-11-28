import { FC, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Field, FieldProps } from 'formik';

// import { useSelector, shallowEqual, useDispatch } from 'react-redux';

// import { fetchCategories, fetchPayments } from '../../helpers/state/listsSlice';

import './TransactionForm.scss';

interface TransactionForm {
    // values:     
}

// { handleSubmit, values, touched, setFieldValue, setFieldTouched, errors, handleChange, handleBlur, type }
const TransactionForm: FC = () => {
	// const dispatch = useDispatch();
	// const categories = useSelector((state) => state.lists.categories.data, shallowEqual);
	// const payments = useSelector((state) => state.lists.payments.data, shallowEqual);
	// const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	// useEffect(() => {
	// 	if (!isAppLoading) {
	// 		if (!categories) dispatch(fetchCategories());
	// 		if (!payments) dispatch(fetchPayments());
	// 	}
	// }, [categories, payments, isAppLoading, dispatch]);

    // (

    // <form
        //     className="form"
        //     noValidate
        //     // onSubmit={handleSubmit}
        //     autoComplete="off"
        // >
        //     <div className="input-wrapper">
        //         <div className={['form-control', touched.email && !errors.email ? 'valid' : '', touched.email && !!errors.email ? 'invalid' : '' ].join(' ')}>
        //             <FontAwesomeIcon icon={faEnvelope} className="icon" />
        //             <input 
        //                 type='email' 
        //                 name='email' 
        //                 placeholder='Email' 
        //                 onChange={handleChange} 
        //                 onBlur={handleBlur}
        //                 value={values.email} 
        //                 className='input'
        //                 required 
        //             />
        //         </div>
        //         <div className="form-control-error">
        //             {
        //                 touched.email && !!errors.email && errors.email
        //             }
        //         </div>
        //     </div>

        //     <div className="input-wrapper">
        //         <div className={['form-control', touched.password && !errors.password ? 'valid' : '', touched.password && !!errors.password ? 'invalid' : '' ].join(' ')}>
        //             <FontAwesomeIcon icon={faLock} className="icon" />
        //             <input 
        //                 type='text'
        //                 name='password' 
        //                 placeholder='Password' 
        //                 onChange={handleChange}
        //                 onBlur={handleBlur}
        //                 value={values.password} 
        //                 className='input'
        //                 required 
        //             />
        //         </div>
        //         <div className="form-control-error">
        //             {
        //                 touched.password && !!errors.password && errors.password
        //             }
        //         </div>
        //     </div>

        //     <button className='submit-btn' type='submit'>Sign in</button>
        // </form>

        // onSubmit={handleSubmit}
		
    // )

	return (
        <Form autoComplete="off" noValidate  className="form">
            <Row className="ml-0 mr-0 flex-wrap" lg="4" md="3" sm="2" xs="1">
                <Col>
                <Form.Group controlId="date">
		 				<Form.Label>Transaction date</Form.Label>
		 				<Field name="date">
		 					{/* {
                                ( { field, form, meta }: FieldProps ) => (
                                    <DatePicker
                                        placeholderText="Select a date"
                                        dateFormat="yyyy-mm-dd"
                                        id="date"
                                        name="date"
                                        selected={values.date}
                                        onChange={(val) => {
                                            setFieldValue('date', val);
                                        }}
                                        onBlur={(e) => {
                                            setFieldTouched('date');
                                        }}
                                        value={values.date}
                                    />
                                )
                            } */}
						</Field>
						{/* {touched.transactionDate && !!errors.transactionDate && (
							<Form.Control.Feedback type="invalid">
								{errors.transactionDate}
							</Form.Control.Feedback>
						)} */}
					</Form.Group>
                </Col>
                <Col>
					<Form.Group controlId="amount">
						<Form.Label>Transaction amount</Form.Label>
						{/* <Form.Control
							placeholder="100"
							type="text"
							name="transactionAmount"
							value={values.transactionAmount}
							onChange={handleChange}
							onBlur={handleBlur}
							isValid={touched.transactionAmount && !errors.transactionAmount}
							isInvalid={
								touched.transactionAmount && !!errors.transactionAmount
							}
						/>
						{touched.transactionAmount && !!errors.transactionAmount && (
							<Form.Control.Feedback type="invalid">
								{errors.transactionAmount}
							</Form.Control.Feedback>
						)} */}
					</Form.Group>
				</Col>
                <Col>
					<Form.Group controlId="categoryId">
						<Form.Label>Category</Form.Label>
						{/* <Field
							as={Select}
							name="categoryId"
							classNamePrefix="select"
							options={categories?.map((c) => {
								return {
									value: c.id,
									label: c.category_name,
								};
							})}
							value={values.categoryId}
							placeholder="Select..."
							// menuIsOpen={true}
							onChange={(e) => {
								setFieldValue('categoryId', e);
							}}
							onBlur={(e) => setFieldTouched('categoryId')}
						/>
						{touched.categoryId && !!errors.categoryId && (
							<Form.Control.Feedback type="invalid">
								{errors.categoryId}
							</Form.Control.Feedback>
						)} */}
					</Form.Group>
				</Col>
                <Col>
					<Form.Group controlId="paymentMethodId">
						<Form.Label>Payment method</Form.Label>
						{/* <Field
							as={Select}
							name="paymentMethodId"
							classNamePrefix="select"
							isDisabled={
								values &&
								values.categoryId &&
								(values.categoryId.value === 13 ||
									values.categoryId.value === 14 ||
									values.categoryId.value === 15)
							}
							options={payments?.map((c) => {
								return {
									value: c.id,
									label: c.method,
								};
							})}
							placeholder="Select..."
							value={values.paymentMethodId}
							onChange={(e) => {
								setFieldValue('paymentMethodId', e);
							}}
							onBlur={(e) => setFieldTouched('paymentMethodId')}
						/>
						{touched.paymentMethodId && !!errors.paymentMethodId && (
							<Form.Control.Feedback type="invalid">
								{errors.paymentMethodId}
							</Form.Control.Feedback>
						)} */}
					</Form.Group>
				</Col>
            </Row>
            {/*  
                </Row>
                <Row className="btn-wrapper mt-3 ml-0 mr-0 justify-content-end">
                    <Col md="auto" className="p-0 ">
                        <Button className="btn" variant="contained" color="primary" type="submit">
                            {type === 'add' ? 'Add' : 'Edit'} transaction
                        </Button>
                    </Col>
                </Row> 
            */}
		</Form>
	);
};

export default TransactionForm;
