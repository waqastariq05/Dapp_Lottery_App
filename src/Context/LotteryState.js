import { useState } from "react";
import LotteryContext from "./LotteryContext";
import detectEthereumProvider from "@metamask/detect-provider";
import lotteryContract from "../contracts/Lottery.json"
import { Web3 } from "web3";

const LotteryState = (props) => {
    const [web3Api, setWeb3Api] = useState({
        web3: null,
        contract: null,
        address: null,
        provider: null
    });

    // Connect To Meta Mask
    const loadProvider = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            provider.request({ method: "eth_requestAccounts" })
            setWeb3Api({
                web3: new Web3(provider),
                contract: null,
                address: null,
                provider
            })
        } else {
            alert("Please install MetaMask!")
        }
    };

    // Intertract with contract
    const init = async () => {
        const netId = await web3Api.web3.eth.net.getId();
        const deployedNet = lotteryContract.networks[netId]
        const instance = new web3Api.web3.eth.Contract(lotteryContract.abi, deployedNet && deployedNet.address);
        setWeb3Api({
            web3: web3Api.web3,
            contract: instance,
            address: deployedNet.address,
            provider: web3Api.provider
        })
    };


    const [account, setAccount] = useState("No account Connected");
    // Automaticaly show connected account
    const setAccountListner = (provider) => {
        provider.on("accountsChanged", (accounts) => {
            setAccount(accounts[0])
        })
    }

    // Get Connected Account
    const getAccount = async () => {
        const { web3, provider } = web3Api;
        const acc = await web3.eth.getAccounts();
        setAccountListner(provider);
        setAccount(acc[0])
    }

    // Reload User List 
    const [reload, setReload] = useState(false)

    const reloadEffect = () => {
        setReload(!reload);
    }

    // Get users list
    const [regUser, setRegUser] = useState([])
    const getUsers = async () => {
        const { contract } = web3Api;
        const users = await contract.methods.allUsers().call()
        const registeredUsers = await Promise.all(
            users.map((user) => {
                return user;
            })
        )
        setRegUser(registeredUsers)
        reloadEffect();
    }

    return (
        <LotteryContext.Provider
            value={{
                web3Api,
                loadProvider,
                init,
                account,
                getAccount,
                regUser,
                getUsers,
                reload
            }}
        >
            {props.children}
        </LotteryContext.Provider>
    );
};

export default LotteryState;
