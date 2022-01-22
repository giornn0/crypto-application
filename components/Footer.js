import Image from "next/image"
import logo from '../public/logo.png'
const Footer = ()=>{
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <Image
            src={logo} alt="logo"
            height="35"
            width="90"
          />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col empty:5">
        <p className="text-white text-sm text-center ">Come join us</p>
        <a href="mailto:shaaamsuu@gmail.com" className="text-white text-sm text-center cursor-pointer">shaaamsuu@gmail.com</a>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5"/>
      <div className="sm:w[90%] w-full flex justify-between items-center mt-3">
        <a href="https://giornn0.github.io/portfolio" target="_blank" rel="noopener noreferrer" className="text-white text-sm text-center ">@giornn0 2022</a>
        <p className="text-white text-sm text-center ">All rights reserved</p>
      </div>
    </div>
  )
}
export default Footer