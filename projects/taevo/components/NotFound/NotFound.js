import React from "react"
import { Link } from "gatsby"

import logo from "./assets/logo-full-color.svg"

import "./NotFound.css"

export default function NotFound(props) {
  let pathname = props.location.hostname.split(".")[0]

  return (
    <section className="Not-Found">
      <header>
        <img src={logo} alt="taevo logo" />
      </header>
      <article>
        <h1>404 Page Not Found</h1>

        {pathname === "careers" ? (
          <Link to="/">Return Home</Link>
        ) : (
          <Link to="/user/login">Return Home</Link>
        )}
      </article>
    </section>
  )
}
