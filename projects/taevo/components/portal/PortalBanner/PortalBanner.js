import React from "react"
import { landing_page } from "../landing_page"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

import "./PortalBanner.css"

export default function PortalBanner() {
  const { heading4, heading2, paragraph } = landing_page.banner

  return (
    <section id="home" className="New-Banner">
      <div className="portal-content">
        <h4>
          <span></span>
          <span>{heading4}</span>
        </h4>
        <h2>{heading2}</h2>
        <p>{paragraph}</p>
        <ul>
          <li>
            <IoChevronBack />
          </li>
          <li>
            <IoChevronForward />
          </li>
        </ul>
      </div>
    </section>
  )
}
