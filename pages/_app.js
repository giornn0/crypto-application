import '../styles/globals.css'
import dynamic from "next/dynamic"
const TransactionProvider = dynamic(()=>import("../context/TransactionContext"),{ssr:false})
import {useEffect, useState} from "react"
function MyApp({ Component, pageProps }) {
  const [ethereum, setEthereum] = useState(null);
  useEffect(()=>{
    setEthereum(window.ethereum)
  },[])
  return (
    <TransactionProvider ethereum={ethereum}>
      <Component {...pageProps} />
    </TransactionProvider>
  )
}

export default MyApp
