import React from "react";
import SocialMediaLogoHeader from "../ui/SocialMediaLogoHeader";
import MainNav from "../ui/MainNav";
import ForSale from "../ui/forSales/ForSale";

const Header = () => {
  return (
    <div>
      <SocialMediaLogoHeader />
      {/* <ForSale /> */}
      <MainNav />
    </div>
  );
};

export default Header;
