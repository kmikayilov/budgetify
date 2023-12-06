import { FC, useCallback, useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { schema as validationSchema, initialValues } from './formikConfig';

import TransactionForm from './TransactionForm';

import { useGetTransactionQuery, useAddTransactionMutation, useEditTransactionMutation } from '../../helpers/state/transactionApi';

import './TransactionDetail.scss';

// import { editTransaction } from '../../helpers/state/transactionSlice';
// import { schema, initialValue } from '../../helpers/transactionSchema';

// toast.configure();

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
	const [ addTransaction, { isLoading: isAddTransactionLoading, isSuccess: isAddTransactionSuccess, isError: isAddTransactionError, error: addTransactionError } ] = useAddTransactionMutation();
	const [ editTransaction, { isLoading: isEditTransactionLoading, isSuccess: isEditTransactionSuccess, isError: isEditTransactionError, error: editTransactionError } ] = useEditTransactionMutation();

	// const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

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
				editTransaction({ id, transaction })

				if ( isEditTransactionSuccess ) {
					// toast.success('Transaction edited successfully!');
					navigate('transactions');
				}

				if ( isEditTransactionError ) {
					// toast.error('Transaction edition failed!');
					console.log('Error message', editTransactionError);
				}

			} else {
				addTransaction(transaction)

				if ( isAddTransactionSuccess ) {
					// toast.success('Transaction edited successfully!');
					navigate('transactions');
				}

				if ( isAddTransactionError ) {
					// toast.error('Transaction edition failed!');
					console.log('Error message', addTransactionError);
				}
			}
		}, 
		[id, navigate, addTransaction, isAddTransactionSuccess, isAddTransactionError, addTransactionError, editTransaction, isEditTransactionError, isEditTransactionSuccess, editTransactionError, isEditing]
	);

	const formik = useFormik({ validationSchema, onSubmit, initialValues, enableReinitialize: true });

	useEffect(() => {	
		if (!!transaction) {
			const values = {
				date: new Date(transaction.date),
				amount: transaction.amount.toString(),
				category: transaction.category.id.toString(),
				payment_method: transaction.payment_method.id.toString(),
			};
		  
			if ( JSON.stringify(values) !== JSON.stringify(formik.values) ) formik.resetForm({ values });		
		}
	}, [transaction, formik]);
   
	return (
		<div className='transaction-detail'>
            <div className="title-wrapper">{ isEditing ? 'Edit the transaction' : 'Create transaction' }</div>
				<TransactionForm { ...formik } isEditing={isEditing} />
		</div>
	);
};

export default TransactionDetail;
