import React from "react"

import "./footer.scss"

export default function Footer() {
  return (
    <footer className='footer'>
      <div className="container">
        <span>{`© ${new Date().getFullYear()}`}</span>
      </div>
    </footer>
  )
}
