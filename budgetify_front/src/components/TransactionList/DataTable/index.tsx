import { FC, useState, useCallback, useEffect, useRef, SetStateAction, Dispatch} from 'react'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faArrowDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { useGetCategoriesQuery, useGetPaymentMethodsQuery, useGetAccountingsQuery } from '../../../helpers/state/listsApi';
import { useGetTransactionsQuery } from '../../../helpers/state/transactionApi' 

import { ISort, ITransaction, IFilter, ICurrentFilter } from '../../../helpers/types'

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../../helpers/state/store';

import { setFetchType, setTransactionId } from '../../../helpers/state/transactionSlice';

import './DataTable.scss'

const DataTable: FC<{ showFilterPanel: boolean; setTotalCount: Dispatch<SetStateAction<number>>, totalCount: number; }> = ({ showFilterPanel, setTotalCount, totalCount }) => {
    
    const dispatch = useDispatch()

    // constants

	const pageSize = 10

    // useRef contstants

    const startIndex = useRef(0);
    const endIndex = useRef(0);

    // navigation
    const navigate = useNavigate()

    // useState management 

    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [sortModel, setSortModel] = useState<ISort>({ field: 'id', direction: 'asc' });
    const [currentFilter, setCurrentFilter] = useState<ICurrentFilter>({ filter: '', query: ''});
    const [filterModel, setFilterModel] = useState<IFilter>({});

    // redux store state

    const token = useSelector((store: RootState) => store.auth?.token, shallowEqual)


    // rtk query management

    const { data: categories } = useGetCategoriesQuery(undefined, { skip: !token })
    const { data: paymentMethods } = useGetPaymentMethodsQuery(undefined, { skip: !token })
    const { data: accountingTypes } = useGetAccountingsQuery(undefined, { skip: !token })
    const { data: transactions }  = useGetTransactionsQuery({ page: currentPage, ...sortModel, ...filterModel }, { skip: !token, refetchOnMountOrArgChange: true })

    // methods

    const onInputHandler = (e: any) => {
        if ( currentFilter.filter !== e.target.id || currentFilter.query !== e.target.value.trim() ) {            
            setCurrentFilter( prevState => ({ ...prevState, filter: e.target.id, query: e.target.value.trim() }))
        }
    };

    const onFilterChange = useCallback( () => {
        const { filter, query } = currentFilter
        
        setFilterModel(prevFilterModel => {
            const newFilterModel: IFilter = { ...prevFilterModel };
            
            if (query === '') {
                
                if (newFilterModel.hasOwnProperty(filter)) delete newFilterModel[filter]
            
            } else {
                newFilterModel[filter] = query;
            }
    
            return newFilterModel;
        });

    }, [currentFilter]);

    const sortData = (field: string) => {
        let direction = 'asc';
        if (sortModel.field === field && sortModel.direction === 'asc') direction = 'desc';
        setSortModel({ field: field, direction: direction })
    }

    const getSortIcon = (field: string) => {
        if (sortModel.field === field) return sortModel.direction === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />;
        return null;
    }
   
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < Math.ceil(totalCount / pageSize)) {
            setCurrentPage(currentPage + 1)                
        }
    };

    const handleDeleteTransactionClick = (id: number | undefined) => {

        if ( typeof(id) == 'number' ) {
            dispatch(setTransactionId(id.toString()))
            dispatch(setFetchType('delete'))
        }

    }

    // useEffect hooks

    useEffect(() => {
        onFilterChange();
    }, [onFilterChange]);

    useEffect(() => {
        startIndex.current = (currentPage - 1) * pageSize + 1;
        endIndex.current = Math.min(currentPage * pageSize, totalCount);
    }, [currentPage, pageSize, totalCount])

    useEffect(() => {
        if (transactions && transactions.count) {
            setTotalCount(transactions.count)
        }
    }, [transactions, setTotalCount])

    // jsx body

    return (
        <>
            <div className='table-wrapper'>
                <table className="dtable">
                    <thead className="thead">
                        <tr>
                            <th className='col-tretiary' onClick={ () => sortData('id') }>Id<span className='sort'>{ getSortIcon('id') }</span></th>
                            <th className='col-primary' onClick={ () => sortData('date') }>Date<span className='sort'>{ getSortIcon('date') }</span></th>
                            <th className='col-primary' onClick={ () => sortData('amount') }>Amount<span className='sort'>{ getSortIcon('amount') }</span></th>
                            <th className='col-secondary' onClick={ () => sortData('category') }>Category<span className='sort'>{ getSortIcon('category') }</span></th>
                            <th className='col-secondary' onClick={ () => sortData('payment_method') }>Payment method<span className='sort'>{ getSortIcon('payment_method') }</span></th>
                            <th className='col-secondary' onClick={ () => sortData('category__accounting') }>Accounting type<span className='sort'>{ getSortIcon('category__accounting') }</span></th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {
                            showFilterPanel && (
                                <tr className="search-inputs" >
                                    <td></td>
                                    <td>
                                        <input type="text" id="date" className="form-control" onKeyUp={onInputHandler} placeholder='2022-08-11' />
                                    </td>
                                    <td>
                                        <input type="text" id="amount" className="form-control" onKeyUp={onInputHandler} placeholder='30' />
                                    </td>
                                    <td>
                                        <select id="category" className='form-control' onChange={onInputHandler}>
                                            <option value=''>Select</option>
                                            {
                                                categories?.map( cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>) )
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <select id="payment_method" className='form-control' onChange={onInputHandler}>
                                            <option value=''>Select</option>
                                            {
                                                paymentMethods?.map( option => (<option key={option.id} value={option.id}>{option.name}</option>) )
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <select id="category__accounting" className='form-control' onChange={onInputHandler}>
                                            <option value=''>Select</option>
                                            {
                                                accountingTypes?.map( type => (<option key={type.id} value={type.id}>{type.name}</option>) )
                                            }
                                        </select>
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                            )
                        }
                        {
                            transactions?.results?.map( (item: ITransaction) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.date.toString()}</td>
                                    <td>$ {item.amount}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.payment_method.name}</td>
                                    <td>{item.category.accounting.name}</td>
                                    <td className='icon'><button className='icon-btn edit' onClick={ () => navigate(`/transactions/${item.id}`) }><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                                    <td className='icon'><button className='icon-btn delete' onClick={ () => handleDeleteTransactionClick(item.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                totalCount > pageSize && (
                    <div className="list-items-paginate">
                        <div className="list-items-paginate-info">Showing {startIndex.current} to {endIndex.current} of <span className="count">{totalCount}</span> results</div>
                        <div className="list-items-paginate-btns">
                            <button className={`btn btn-previous ${ currentPage === 1 ? "disabled" : "" }`} onClick={handlePrevClick} disabled={currentPage === 1}><FontAwesomeIcon icon={faAngleLeft} /></button>
                            <button className={`btn btn-next ${ currentPage >= Math.ceil(totalCount / pageSize) ? "disabled" : "" }`} onClick={handleNextClick} disabled={currentPage >= Math.ceil(totalCount / pageSize)}><FontAwesomeIcon icon={faAngleRight} /></button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DataTable
