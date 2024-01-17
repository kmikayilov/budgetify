import { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { ColumnChart, DonutChart, LineGraph } from './Charts';

import { Bar, Line } from 'recharts';

import { useGetIncomeExpenseStatQuery, useGetTotalNetStatQuery, useGetCategoriesStatQuery } from '../../helpers/state/statsApi';

import { RootState } from '../../helpers/state/store';

import './Dashboard.scss';

const Dashboard: FC = () => {

    const navigate = useNavigate()

    const user = useSelector((store: RootState) => store.auth?.user, shallowEqual)

    const { data: incomeExpense } = useGetIncomeExpenseStatQuery()
	const { data: totalNet } = useGetTotalNetStatQuery()
	const { data: categoriesDonutChart } = useGetCategoriesStatQuery()

    return (
        <div className='dashboard'>
                
            { 
                !user && (
                    <Box
                        className="dashboard-main"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <AccountBalanceIcon />
                        <Typography variant="h4">Welcome to Budget Manager</Typography>
                        <Typography variant="h6" onClick={ () => { navigate('/sign-in') }}>
                            Login to proceed further in the website
                        </Typography>
                    </Box>
                )
            }

            {
                !!user && (
                    <div className='dashboard-stats'>
                        <div className="card">
                            <ColumnChart data={incomeExpense}>
                                <Bar dataKey="income" fill="#28acc0" />
                                <Bar dataKey="expense" fill="#688dff" />
                            </ColumnChart>
                        </div>

                        <div className="card">
                            <LineGraph data={totalNet}>
                                <Line
                                    type="monotone"
                                    dataKey="net"
                                    stroke="#28acc0"
                                    activeDot={{ r: 8 }}
                                />
                            </LineGraph>
                        </div>

                        <div className="card">
                            <DonutChart data={categoriesDonutChart} />
                        </div>
                    </div>
                ) 
            }
        </div>
    )
}

export default Dashboard