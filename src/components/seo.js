import React from "react"
import Helmet from "react-helmet"

const DEFAULT_DESCRIPTION =
  "A blog about web development, programming, and life."

export default function Seo({
  title,
  children,
  description = DEFAULT_DESCRIPTION,
}) {
  return (
    <Helmet title={title}>
      <html lang="en" />
      <link rel="icon" href="/logo.png" />
      <meta name="description" content={description} />

      {/* Add as many more meta information as your site needs */}

      {children}
    </Helmet>
  )
}
