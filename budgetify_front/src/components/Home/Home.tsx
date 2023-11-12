import React, { useState } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Home.scss';

const Home: React.FC = () => {

    return (
        <div className="Home" data-testid="Home">
			<Header />
			<div className="content">

			</div>
			<Footer />
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