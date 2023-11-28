import React, { useState, useCallback, useEffect, useRef} from 'react';
// import { headers, setNavigate } from './tableConfig';
// import TransactionsTable from './TransactionsTable';
// import { Typography, Box } from '@mui/material';

// import { useGetCategoriesQuery } from '../../helpers/state/api';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { filterTransactions } from '../../helpers/state/transactionSlice';
// import { setFetchType } from '../../helpers/state/transactionSlice';
// import TransactionDelete from '../TransactionDelete/TransactionDelete';
import './TransactionList.scss';

import DataTable from '../DataTable/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TransactionList = () => {
    
	const [ showFilterPanel, setShowFilterPanel ] = useState<boolean>(false)

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
	
	return (
		<div className="list-items">
			<div className="list-items-title">Transactions</div>
			<div className="list-items-info">
                <div className="list-items-info-count">Found <span className="count"></span> transactions</div>
                <div className="list-items-layout">
					<button className="btn" onClick={ () => setShowFilterPanel( prevState => !prevState )}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>
			<DataTable showFilterPanel={showFilterPanel} />
		</div>
	);
};

export default TransactionList;
