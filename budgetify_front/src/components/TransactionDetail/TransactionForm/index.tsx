import { FC } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faTag, faCreditCard, faCalendar } from '@fortawesome/free-solid-svg-icons';

import { useGetCategoriesQuery, useGetPaymentMethodsQuery } from '../../../helpers/state/listsApi';

import { TransactionFormik } from '../formikConfig';

import "react-datepicker/dist/react-datepicker.css";
import './TransactionForm.scss';

const TransactionForm: FC<TransactionFormik> = ({ handleSubmit, values, touched, setFieldValue, setFieldTouched, errors, handleChange, handleBlur, isEditing }) => {
    
    // rtk query management
    const { data: categories } = useGetCategoriesQuery()
    const { data: payment_methods } = useGetPaymentMethodsQuery()

	return (
        <form className="form" noValidate onSubmit={handleSubmit} autoComplete="off">
            <div className="input-wrapper">
                <div className='form-control-title'>Amount</div>
                <div className={['form-control', touched.amount && !errors.amount ? 'valid' : '', touched.amount && !!errors.amount ? 'invalid' : '' ].join(' ')}>
                    <FontAwesomeIcon icon={faDollarSign} className="icon" />
                    <input 
                        type='amount' 
                        name='amount' 
                        placeholder='Amount' 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        value={values.amount} 
                        className='input'
                        required 
                    />
                </div>
                <div className="form-control-error">
                    {
                        touched.amount && !!errors.amount && errors.amount
                    }
                </div>
            </div>

            <div className="input-wrapper">
                <div className='form-control-title'>Date</div>
                <div className={['form-control', touched.date && !errors.date ? 'valid' : '', touched.date && !!errors.date ? 'invalid' : '' ].join(' ')}>
                    <FontAwesomeIcon icon={faCalendar} className="icon" />
                    <DatePicker
                        className='input'
                        placeholderText="Select a date"
                        dateFormat="yyyy-mm-dd"
                        id="date"
                        name="date"
                        selected={values.date}
                        onChange={ (val) => setFieldValue('date', val) }
                        onBlur={ () => setFieldTouched('date') }
                        value={values.date.toString()}
                    />
                </div>
                <div className="form-control-error">
                    {/* {
                        touched.date && !!errors.date && errors.date
                    } */}
                </div>
            </div>
            
            <div className="input-wrapper">
                <div className='form-control-title'>Category</div>
                <div className={['form-control', touched.category && !errors.category ? 'valid' : '', touched.category && !!errors.category ? 'invalid' : '' ].join(' ')}>
                    <FontAwesomeIcon icon={faTag} className="icon" />
                    <select 
                        className="input select" 
                        name='category' 
                        placeholder='category' 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        value={values.category}
                    >
                        <option value=''>Select category</option>
                        { categories?.map( (cat) => <option key={cat.id} value={cat.id}>{cat.name}</option> ) } 
                    </select>
                </div>
                <div className="form-control-error">
                    {
                        touched.category && !!errors.category && errors.category
                    }
                </div>
            </div>

            <div className="input-wrapper">
                <div className='form-control-title'>Payment method</div>
                <div className={['form-control', touched.payment_method && !errors.payment_method ? 'valid' : '', touched.payment_method && !!errors.payment_method ? 'invalid' : '' ].join(' ')}>
                    <FontAwesomeIcon icon={faCreditCard} className="icon" />
                    <select 
                        className="input select" 
                        name='payment_method' 
                        placeholder='payment_method' 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        value={ values.payment_method }
                    >
                        <option value=''>Select payment method</option>
                        { payment_methods?.map( (method) => <option key={method.id} value={method.id}>{method.name}</option> ) } 
                    </select>
                </div>
                <div className="form-control-error">
                    {
                        touched.payment_method && !!errors.payment_method && errors.payment_method
                    }
                </div>
            </div>

            <button className='submit-btn' type='submit'>{ isEditing ? 'Edit the transaction' : 'Create transaction' }</button>
        </form>
	);
};

export default TransactionForm;
