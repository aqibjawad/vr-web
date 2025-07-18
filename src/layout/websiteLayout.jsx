import React, { useState, useEffect } from "react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const WebsiteLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default WebsiteLayout;
