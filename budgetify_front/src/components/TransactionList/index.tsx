import { FC, useState, useCallback } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFetchType, setTransactionId } from '../../helpers/state/transactionSlice';
import TransactionDelete from '../TransactionDelete';

import { RootState } from '../../helpers/state/store';

import './TransactionList.scss';

import DataTable from './DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const TransactionList: FC = () => {
    
	const navigate = useNavigate()

	const [ showFilterPanel, setShowFilterPanel ] = useState<boolean>(false)
	const [ totalCount, setTotalCount ] = useState<number>(0)

	const dispatch = useDispatch();
	const isShownDelete = useSelector((state: RootState) => state.transaction?.fetchType === 'delete' && !!state.transaction?.transactionId, shallowEqual);

	const onDeleteClose = useCallback(() => {
			dispatch(setFetchType(''));
			dispatch(setTransactionId('0'));
	}, [dispatch]);
	
	return (
		<>
			<TransactionDelete isShown={isShownDelete} handleClose={ onDeleteClose } />
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
