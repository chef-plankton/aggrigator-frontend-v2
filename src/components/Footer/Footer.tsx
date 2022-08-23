import React from "react";
import Logo from '../../assets/lightlogo2.png'
import InstagramIcon from '../../assets/img/socials/instagram.png'
import TelegramIcon from '../../assets/img/socials/telegram.png'
function Footer() {
  return (
    <footer className='w-[100%] flex justify-center bg-[#18172E] py-[15px] px-[50px]'>
      <div className='flex flex-col'>
        <img src={Logo} alt='Logo' className="h-[50px] my-2" />
        <div className="flex justify-evenly py-5 mt-2 items-center">
          <a href='https://twitter.com/akka_finance' target="_blank">
            <img src={InstagramIcon} alt='' className="w-[20px]"/>
          </a>

          <a href='https://t.me/akkafinance' target="_blank">
            <img src={TelegramIcon} alt='' className="w-[20px]"/>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
