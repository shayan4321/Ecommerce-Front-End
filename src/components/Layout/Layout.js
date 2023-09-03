import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

import  { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      {/* Helemt is use for SEO */}
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords}/>
          <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Ecommerce App - Shop Now',
  description: 'Mern Stack Project',
  keywords: 'MERN, MongoDB, Express, React, Node',
  author: 'Ahmed'
}

export default Layout;
