import { Link } from "gatsby"
import React from "react"

import "./header.scss"

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <span className="header__site-name">Blog</span>
        <nav className="header__links">
          <ul>
            <li>
              <Link to="/contents">Contents</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
