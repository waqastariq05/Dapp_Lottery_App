import React, { useEffect, useState, useContext } from 'react'
import LotteryContext from '../Context/LotteryContext';

const Manager = () => {
    const context = useContext(LotteryContext);
    const { web3Api, account, getAccount } = context;

    const [balance, setBalance] = useState(0)
    const [winner, setWinner] = useState("No Winner Yet")

    useEffect(() => {
        web3Api.web3 && getAccount();
    }, [web3Api.web3])


    const handleBalance = async () => {
        try {
            const bal = await web3Api.contract.methods.getBalance().call({ from: account })
            setBalance(web3Api.web3.utils.fromWei(bal, "ether"))
        } catch (error) {
            alert("You are not the manager");
        }
    }

    const handleWinner = async () => {
        try {
            await web3Api.contract.methods.selectWinner().send({ from: account })
            const lotteryWinner = await web3Api.contract.methods.winner().call
            setWinner(lotteryWinner)
        } catch (e) {
            console.log(e)
            if (e.message.includes("You are not mannager")) {
                alert("You are not the manager");
            } else if (e.message.includes("Atleast 3 user participate in this lottery")) {
                alert("Atleast 3 user participate in this lottery");
            } else {
                alert("Some Error Occur");
            }
        }
    }

    console.log(winner);

    return (
        <div className='box'>
            <div className="card shadow border-0">
                <div className="card-body">
                    <h2 className="card-title">Cannected Account: <span>{account}</span></h2>
                    <hr />
                    <div className='py-2'>
                        <h6 className="card-subtitle">Winner: <span>{winner}</span></h6>
                        <div className='btn-div'>
                            <button type="button" className="btn btn-primary px-4 fw-semibold rounded-0" onClick={handleWinner}>Click For Winner</button>
                        </div>
                    </div>
                    <hr />
                    <div className='py-2'>
                        <h6 className="card-subtitle">Balance: <span>{balance} ETH</span></h6>
                        <div className='btn-div'>
                            <button type="button" className="btn btn-primary px-4 fw-semibold rounded-0" onClick={handleBalance}>Click For Balance</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager
