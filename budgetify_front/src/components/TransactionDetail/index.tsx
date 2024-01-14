import { FC, useCallback, useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import TransactionForm from './TransactionForm';

import { useGetTransactionQuery, useAddTransactionMutation, useUpdateTransactionMutation } from '../../helpers/state/transactionApi';

import './TransactionDetail.scss';

export interface TransactionFormStructure {  
    date: Date;
    amount: string;
    category: string;
    payment_method: string;
}

const validationSchema = yup.object().shape({
    date: yup.date().required('Transaction date is required'),
    amount: yup.string().matches(/^\d+$/).required('Transaction amount is required'),
    category: yup.string().required('Category is required'),
    payment_method: yup.string().required('Payment method is required'),
})

const initialValues: TransactionFormStructure = {
    date: new Date(),
    amount: '',
    category: '',
    payment_method: ''
};

const TransactionDetail: FC = () => {
	
	const navigate = useNavigate();

	const [ transactionId, setTransactionId ] = useState<string>('')
	const [ isEditing, setIsEditing ] = useState<boolean>(false); 
	
	let { id } = useParams();

	useEffect( () => {
		if (id) {
			setIsEditing(true);
			setTransactionId(id);
		} else {
			setTransactionId('0');
		}
	}, [id])
	
	const { data: transaction } = useGetTransactionQuery(transactionId, { skip: !isEditing  });
	const [ addTransaction ] = useAddTransactionMutation();
	const [ updateTransaction ] = useUpdateTransactionMutation();

	const onSubmit = useCallback(
		(data: any, { resetForm }: any) => {
			console.log(data);
			
			let date = data.date.toISOString().slice(0, 10);
			let transaction = {
				payment_method: data.payment_method,
				category: data.category,
				amount: data.amount,
				date: date,
			};

			if ( isEditing ) {
				
				updateTransaction({ id, transaction })
					.unwrap()
					.then( fulfilled => {
						toast.success('Transaction updated successfully!');
						navigate('/transactions');
					})
					.catch( rejected => {
						toast.error('Transaction update failed!');
						console.log('Error message', rejected);
					})
				
			} else {
				addTransaction(transaction)
					.unwrap()
					.then( fulfilled => {
						toast.success('Transaction created successfully!');
						navigate('/transactions');
					})
					.catch( rejected => {
						toast.error('Transaction creation failed!');
						console.log('Error message', rejected);
					})
			}
		}, 
		[id, navigate, isEditing, addTransaction, updateTransaction]
	);

	const { handleSubmit, values, touched, setFieldValue, setFieldTouched, errors, handleChange, handleBlur, resetForm, isValid } = useFormik({ validationSchema, onSubmit, initialValues, enableReinitialize: true });

	useEffect(() => {
		if (!!transaction) {
			const values = {
				date: new Date(transaction.date),
				amount: transaction.amount.toString(),
				category: transaction.category.id.toString(),
				payment_method: transaction.payment_method.id.toString(),
			};
		  
			resetForm({ values });
		}
	}, [transaction, resetForm]);
	
	return (
		<div className='transaction-detail'>
            <div className="title-wrapper">Transaction</div>
			<TransactionForm { ...{ handleSubmit, values, touched, setFieldValue, setFieldTouched, errors, handleChange, handleBlur, isValid } } isEditing={isEditing} />
		</div>
	);
};

export default TransactionDetail;
