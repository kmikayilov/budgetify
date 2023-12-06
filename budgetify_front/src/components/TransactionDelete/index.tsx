import { FC, useCallback } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableHead,
// 	TableRow,
// 	Paper,
// 	Button,
// } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash, faArrowUp, faArrowDown, faClose } from '@fortawesome/free-solid-svg-icons';

// import {
// 	selectIncomeExpenseBarChart,
// 	selectTotalNetBarChart,
// 	selectCategoriesDonutChart,
// } from '../../helpers/state/analysisSlice';

import './TransactionDelete.scss';
// import { deleteTransaction } from '../../helpers/state/transactionSlice';

// toast.configure();

interface TransactionDeleteProps {
	isShown: boolean;
	handleClose: () => void;
}

const TransactionDelete: FC<TransactionDeleteProps> = ({ isShown, handleClose }) => {
    
	// const dispatch = useDispatch();
	// const transaction = useSelector((state) => state.transaction.transaction, shallowEqual);

    const handleDelete = useCallback(() => {
		// if (!!transaction) 
			// dispatch(
			// 	deleteTransaction({
			// 		id: transaction.id,
			// 		data: {
			// 			transaction: {
			// 				id: transaction.id,
			// 			},
			// 		},
			// 	})
			// )
			// 	.then(unwrapResult)
			// 	.then((result) => {
			// 		dispatch(selectIncomeExpenseBarChart());
			// 		dispatch(selectTotalNetBarChart());
			// 		dispatch(selectCategoriesDonutChart());

			// 		toast.success(result.Success);
			// 		handleClose();
			// 	})
			// 	.catch((error) => {
			// 		toast.error(error);
			// 		console.log('error: ', error);
			// 	});
	}, []);
    
	return (
		<Modal size="lg" show={isShown} onHide={handleDelete} centered>
			<Modal.Header closeButton>
				<Modal.Title>Are you sure that you want to delete this transaction?</Modal.Title>
			</Modal.Header>
			
            {/* {transaction && (
				<Modal.Body>
					<TableContainer className="table-container" component={Paper}>
						<Table className="table" size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell className="id" align="right">
										Id
									</TableCell>
									<TableCell className="transactionAmount" align="right">
										Transaction amount
									</TableCell>
									<TableCell className="transactionDate" align="right">
										Transaction date
									</TableCell>
									<TableCell className="category_name" align="right">
										Category
									</TableCell>
									<TableCell className="payment_method" align="right">
										Payment
									</TableCell>
									<TableCell className="accounting_type" align="right">
										Accounting
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow key={transaction.id}>
									<TableCell
										className="id"
										component="th"
										scope="transaction">
										{transaction.id}
									</TableCell>
									<TableCell className="transactionAmount" align="right">
										{transaction.transactionAmount}
									</TableCell>
									<TableCell className="transactionDate" align="right">
										{transaction.transactionDate}
									</TableCell>
									<TableCell className="category_name" align="right">
										{transaction.category_name}
									</TableCell>
									<TableCell className="payment_method" align="right">
										{transaction.payment_method}
									</TableCell>
									<TableCell className="accounting_type" align="right">
										{transaction.accounting_type}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Modal.Body>
			)} */}

			<Modal.Footer>
				<button className='custom-btn delete'>
					<span className="icon"><FontAwesomeIcon icon={faTrash} /></span>
					<span className="title">Delete the transaction</span>
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default TransactionDelete;
