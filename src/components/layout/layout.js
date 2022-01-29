import React from "react"
import Footer from "../footer/footer"
import Header from "../header/header"

import "./layout.scss"

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="container children">{children}</div>
      <Footer />
    </div>
  )
}
