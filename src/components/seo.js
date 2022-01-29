import React from "react"
import Helmet from "react-helmet"

export default function Seo({ title, children }) {
  return (
    <Helmet title={title}>
      <link rel="icon" href="/logo.png" />
      {children}
    </Helmet>
  )
}
