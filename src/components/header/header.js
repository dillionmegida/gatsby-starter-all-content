import { Link } from "gatsby"
import React from "react"

import "./header.scss"

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__site-name">
          Blog
        </Link>
        <nav className="header__links">
          <ul>
            <li>
              <Link to="/content">Content</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
