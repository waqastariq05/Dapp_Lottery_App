import React, { useContext, useEffect } from 'react'
import LotteryContext from '../Context/LotteryContext';

const User = () => {
    const context = useContext(LotteryContext);
    const { web3Api, account, getAccount, regUser, getUsers, reload } = context;

    useEffect(() => {
        web3Api.web3 && getAccount();
        web3Api.contract && getUsers();
    }, [web3Api.web3, web3Api.contract, reload])

    return (
        <div className='box'>
            <div className="card shadow border-0">
                <div className="card-body">
                    <h2 className="card-title">Cannected Account: <span>{account}</span></h2>
                    <hr />
                    <div className='py-2'>
                        <h6 className="card-subtitle mb-1">Please pay 1 ether on this contract address: <span>{web3Api.address}</span></h6>
                    </div>
                    <hr />
                    <div className='py-2'>
                        <h6 className="card-subtitle">Registerd Players: </h6>
                        {regUser.length !== 0 && regUser.map((name) => {
                            return <li className='mb-1' key={name}>{name}</li>
                        })}
                        {/* 
                        <div className='btn-div'>
                            <button type="button" className="btn btn-primary px-4 fw-semibold rounded-0" onClick={handleBalance}>Click For Balance</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
