import React from "react"
import { Link } from "gatsby"

import "./DesktopNavigation.css"

export default function DesktopNavigation(
  props,
  { clearSearch, position, onToggle }
) {
  const style = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    animationName: "slideInDown",
    animationDuration: "0.5s",
  }

  let { location } = props
  let pathname = location

  const onMenuToggle = () => {
    clearSearch()
    onToggle()
  }
  return (
    <ul className="Desktop-navigation" style={position ? style : null}>
      <li>
        <Link activeClassName="active" onClick={onMenuToggle} exact to="/">
          Home
        </Link>
      </li>
      <li>
        <a onClick={onMenuToggle} href="/about#about">
          About
        </a>
      </li>
      <li>
        <a onClick={onMenuToggle} href="/about#services">
          Services
        </a>
      </li>
      <li>
        <Link activeClassName="active" onClick={onToggle} to="/jobs">
          Jobs
        </Link>
      </li>
      <li>
        <Link
          activeClassName="active"
          onClick={onMenuToggle}
          to={`${pathname}`}
        >
          Blog
        </Link>
      </li>
      <li>
        <a onClick={onMenuToggle} href="/about#contact">
          Contact
        </a>
      </li>
    </ul>
  )
}
