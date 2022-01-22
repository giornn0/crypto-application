import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Welcome,Navbar,Footer, Services,Transactions} from "../components/index.components"

export default function Home() {
  return (
    <>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar></Navbar>
        <Welcome></Welcome>
      </div>
      <Services></Services>
      <Transactions></Transactions>
      <Footer></Footer>
    </div>
    </>
  )
}
