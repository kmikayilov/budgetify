import { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { RootState } from '../../helpers/state/store';

import './Dashboard.scss';

const Dashboard: FC = () => {

    const navigate = useNavigate()

    const user = useSelector((store: RootState) => store.auth?.user, shallowEqual)

    return (
        <div className='dashboard'>
            <Box
                className="dashboard-main"
                display="flex"
                flexDirection="column"
                alignItems="center">
                <AccountBalanceIcon />
                <Typography variant="h4">Welcome to Budget Manager</Typography>
                { 
                    !user && (
                        <Typography variant="h6" onClick={ () => { navigate('/sign-in') }}>
                            Login to proceed further in the website
                        </Typography>
                    ) 
                }

                { 
                    !!user && (
                        <Typography variant="h6" onClick={ () => { navigate('/transactions') }}>
                            Look at the Transactions section
                        </Typography>
                    ) 
                }
            </Box>
        </div>
    )
}

export default Dashboard