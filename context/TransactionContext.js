import {createContext, useEffect, useState} from "react"
import {ethers} from "ethers";

import {contractAddress, contractABI} from "../utils/constants"

export const TransactionContext = createContext();
const getEthereumContract = ()=>{
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  return transactionContract
}
export default function TransactionProvider({children}){
  const [formData, setFormData] = useState({
    addressTo:'',
    amount:'',
    keyword:'',
    message:'',
  });
  const [isLoading, setIsLoading] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([]);
  const checkIfWalletConnected = async ()=>{
    try {
      if(!ethereum) return alert("Please install metamask")
      const accounts = await ethereum.request({method:'eth_accounts'});
      if(accounts.length){
        setCurrentAccount(accounts[0])
        getAllTransactions();
      }
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }
  
  const checkIfTransactionsExist = async ()=>{
    try {
      const transactionContract = getEthereumContract()
      
      const countAllTransactions = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount",transactionCount)
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }
  
  const handleChange= (control,value)=>{
    setFormData((previus)=>({...previus,[control]:value}))
  }

  const getAllTransactions = async()=>{
    try {
      if(!ethereum) return alert("Please install metamask")
      const transactionContract = getEthereumContract()
      const availableTransactions = await transactionContract.getOldTransactions();
      const structuredTransactions = availableTransactions.map((transaction)=>({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamps: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword:transaction.keyword,
        amount: parseInt(transaction.amount._hex)* (10**-18)
      }))
      setTransactions(structuredTransactions)
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }
  
  const connectWallet= async()=>{
    try {
      if(!ethereum) return alert("Please install metamask")
      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

  const sendTransaction = async ()=>{
    try {
      if(!ethereum) return alert("Please install metamask")
      const {addressTo,amount,keyword,message} = formData
      const transactionContract = getEthereumContract()
      const parseAmount = ethers.utils.parseEther(amount); //parse the decimal amount to a hex value of gwei
      await ethereum.request({
        method:'eth_sendTransaction',
        params:[{
          from:currentAccount,
          to: addressTo,
          gas: '0x5208',//gwei 21000 on  hex -> number of gwei which is a sub-unit from ethereum
          value: parseAmount._hex,
        }]
      });
      const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword)
      setIsLoading(true)
      console.log(`Loading ${transactionHash.hash}`)
      await transactionHash.wait();
      setIsLoading(false)
      console.log(`Success ${transactionHash.hash}!`)
      const countAllTransactions = await transactionContract.getTransactionCount();
      setTransactionCount(countAllTransactions.toNumber())
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

  useEffect(()=>{
    checkIfWalletConnected()
    checkIfTransactionsExist()
  },[])
  return (
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,sendTransaction,handleChange,isLoading,transactions}}>
      {children}
    </TransactionContext.Provider>
  )
}