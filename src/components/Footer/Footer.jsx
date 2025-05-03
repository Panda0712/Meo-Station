import { Link } from "react-router-dom";
import FacebookIcon from "~/assets/facebook.svg?react";
import InstagramIcon from "~/assets/instagram.svg?react";
import LocationIcon from "~/assets/location.svg?react";
import MailIcon from "~/assets/mail.svg?react";
import PhoneIcon from "~/assets/phone.svg?react";
import MeoLogo from "/panda-logo.png";
import TwitterIcon from "~/assets/twitter.svg?react";
import { menuList } from "~/components/Navbar/constants";

const Footer = () => {
  const footerClass = {
    listStyle: "flex flex-col gap-3",
    itemStyle: "cursor-pointer font-normal transition hover:opacity-70",
    iconStyle: "w-6 h-6 cursor-pointer transition hover:opacity-70",
  };

  return (
    <footer className="md:px-24 sm:px-12 px-8 border border-t-1 border-gray-300 border-x-0 border-b-0 pt-8 py-6">
      <section className="flex flex-wrap justify-between items-start gap-8">
        <div className="flex flex-col border-b border-slate-300 w-full md:w-auto pb-8 md:pb-0 md:border-0 justify-center gap-4">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={MeoLogo} className="object-cover w-8 h-8" alt="" />
              <h1 className="font-medium text-[20px]">
                <span className="text-blue-600">Meo</span>Station.
              </h1>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <FacebookIcon
              className={`${footerClass.iconStyle} fill-[#4267B2]`}
            />
            <TwitterIcon
              className={`${footerClass.iconStyle} fill-[#1DA1F2]`}
            />
            <InstagramIcon
              className={`${footerClass.iconStyle} fill-[#C13584]`}
            />
          </div>
          <p>Liên lạc: 0369332842</p>
          <span>@ 2024 MeoStation</span>
        </div>

        <div className="flex flex-col border-b border-slate-300 w-full md:w-auto pb-8 md:pb-0 md:border-0 justify-center gap-2">
          <h2 className="font-medium text-[18px]">Khám phá</h2>
          <ul className={footerClass.listStyle}>
            {menuList.map((menu) => (
              <Link key={menu.name} to={menu.path}>
                <li className={footerClass.itemStyle}>{menu.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex flex-col border-b border-slate-300 w-full md:w-auto pb-8 md:pb-0 md:border-0 justify-center gap-2">
          <h2 className="font-medium text-[18px]">Kết nối với chúng tôi</h2>
          <ul className={footerClass.listStyle}>
            <li className="flex items-center gap-2">
              <MailIcon className={`${footerClass.iconStyle} fill-[#3e65cf]`} />
              <span>meostation@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon
                className={`${footerClass.iconStyle} fill-green-600`}
              />
              <span>0369332842</span>
            </li>
            <li className="flex items-center gap-2 font-medium">
              <LocationIcon
                className={`${footerClass.iconStyle} fill-amber-600`}
              />
              <span>
                <span className="text-blue-600">Meo</span>Station,{" "}
                <span className="font-normal">Ho Chi Minh</span>
              </span>
            </li>
          </ul>
        </div>
      </section>
      <p className="text-center w-full mt-12 mb-6">
        Copyright 2024 • Bản quyền thuộc về •{" "}
        <span className="text-blue-600 font-medium">Meo</span>
        <span className="font-medium">Station</span>
      </p>
    </footer>
  );
};

export default Footer;
