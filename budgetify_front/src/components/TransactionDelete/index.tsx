import { FC, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCalendar, faDollarSign, faTag, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import { useGetTransactionQuery, useDeleteTransactionMutation } from '../../helpers/state/transactionApi';
import { RootState } from '../../helpers/state/store';

// import {
// 	selectIncomeExpenseBarChart,
// 	selectTotalNetBarChart,
// 	selectCategoriesDonutChart,
// } from '../../helpers/state/analysisSlice';

import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionDelete.scss';

interface TransactionDeleteProps {
	isShown: boolean;
	handleClose: () => void;
}

const TransactionDelete: FC<TransactionDeleteProps> = ({ isShown, handleClose }) => {
    
	const transactionId = useSelector((state: RootState) => state.transaction?.transactionId, shallowEqual);

	const { data: transaction } = useGetTransactionQuery(transactionId, { skip: transactionId === '0' });

	const [ deleteTransaction ] = useDeleteTransactionMutation()

    const handleDelete = useCallback(() => {
		if (!!transaction && !!transaction.id) {
			deleteTransaction(transaction.id.toString())
				.unwrap()
				.then( fulfilled => {

					// 		dispatch(selectIncomeExpenseBarChart());
					// 		dispatch(selectTotalNetBarChart());
					// 		dispatch(selectCategoriesDonutChart());

					toast.success(`The transaction is successfully deleted`)
					handleClose()
				})
				.catch( rejected => {
					toast.error(rejected)
					console.log('error: ', rejected)
				})
		}

	}, [transaction, deleteTransaction, handleClose ]);
    
	return (
		<Modal size="lg" show={isShown} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			
            {transaction && (
				<Modal.Body>
					<div className="form">
						<div className="input-wrapper">
							<div className='form-control-title'>Amount</div>
							<div className='form-control'>
								<FontAwesomeIcon icon={faDollarSign} className="icon" />
								<div className='input'>{ transaction.amount }</div>
							</div>
						</div>

						<div className="input-wrapper">
							<div className='form-control-title'>Date</div>
							<div className='form-control'>
								<FontAwesomeIcon icon={faCalendar} className="icon" />
								<div className='input'>{ transaction.date.toString() }</div>
							</div>
						</div>

						<div className="input-wrapper">
							<div className='form-control-title'>Category</div>
							<div className='form-control'>
								<FontAwesomeIcon icon={faTag} className="icon" />
								<div className='input'>{ transaction.category.name }</div>
							</div>
						</div>

						<div className="input-wrapper">
							<div className='form-control-title'>Payment method</div>
							<div className='form-control'>
								<FontAwesomeIcon icon={faCreditCard} className="icon" />
								<div className='input'>{ transaction.payment_method.name }</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			)}

			<Modal.Footer>
				<button className='custom-btn delete' onClick={handleDelete}>
					<span className="icon"><FontAwesomeIcon icon={faTrash} /></span>
					<span className="title">Delete the transaction</span>
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default TransactionDelete;
