import { FC, useState, useCallback, useEffect, useRef} from 'react';
// import { headers, setNavigate } from './tableConfig';
// import TransactionsTable from './TransactionsTable';
// import { Typography, Box } from '@mui/material';

// import { useGetCategoriesQuery } from '../../helpers/state/api';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { filterTransactions } from '../../helpers/state/transactionSlice';
// import { setFetchType } from '../../helpers/state/transactionSlice';
import TransactionDelete from '../TransactionDelete';
import './TransactionList.scss';

import DataTable from './DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const TransactionList: FC = () => {
    
	const navigate = useNavigate()

	const [ showFilterPanel, setShowFilterPanel ] = useState<boolean>(false)
	const [ totalCount, setTotalCount ] = useState<number>(0)

	// const dispatch = useDispatch();
	// const transactions = useSelector((state) => state.transaction.transactions, shallowEqual);
	// const transactionCount = useSelector(
	// 	(state) => state.transaction.transactionCount,
	// 	shallowEqual
	// );
	// const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	// //----------------------------------

	// const isShownDelete = useSelector(
	// 	(state) => state.transaction.fetchType === 'delete' && !!state.transaction.transaction,
	// 	shallowEqual
	// );

	// const onDeleteClose = useCallback(() => {
	// 	// dispatch(setFetchType(''));
	// }, []);

	//---------------------------------------

	// const isShownDelete = useSelector((state) => state.transaction.fetchType === 'delete' && !!state.transaction.transaction, shallowEqual);

	// const onDeleteClose = useCallback(() => {
	// 	dispatch(setFetchType(''));
	// }, [dispatch]);
	
	return (
		<>
			<TransactionDelete isShown={true} handleClose={ () => { console.log('close transaction delete modal!') } } />
			<div className="list-items">
				<div className="list-items-title">Transactions</div>
				<div className="list-items-info">
					<div className="list-items-info-count">Found <span className="count">{totalCount}</span> transactions</div>
					<div className="list-items-layout">
						<button className="btn add" onClick={ () => navigate('/transactions/new') }><FontAwesomeIcon icon={faPlus} /></button>
						<button className="btn search" onClick={ () => setShowFilterPanel( prevState => !prevState )}><FontAwesomeIcon icon={faSearch} /></button>
					</div>
				</div>
				<DataTable showFilterPanel={showFilterPanel} setTotalCount={setTotalCount} totalCount={totalCount} />
			</div>
		</>
	);
};

export default TransactionList;
