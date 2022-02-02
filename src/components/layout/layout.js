import React from "react"
import Footer from "../footer/footer"
import Header from "../header/header"

import "./layout.scss"

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="container children">{children}</main>
      <Footer />
    </div>
  )
}
