import React, { useState } from 'react';

import Header from '../Header/Header';

import './Home.scss';

const Home: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="Home" data-testid="Home">
			<Header toggle={() => setIsOpen(!isOpen)} />
			{/* <Grid container className="main"> */}
				{/* <SideNavBar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} /> */}
				{/* <Routes> */}
					{/* <Route path="/transactions" Component={TransactionsList} /> */}
					{/* <Route path="/transactions/new" Component={TransactionAdd} /> */}
					{/* <Route path="/transaction/:id" Component={TransactionEdit} /> */}
					{/* <Route path="/analysis" Component={Analysis} /> */}
				{/* </Routes> */}
			{/* </Grid> */}
		</div>
    )
}

export default Home