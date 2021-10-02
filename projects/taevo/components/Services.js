import React from "react"
import { service } from "./services_content"
import "./Services.css"

import { Link } from "gatsby"

export default function Services() {
  return (
    <section id="services" className="Services">
      {service.map((feature, i) => (
        <article key={feature.id} className={`Service-Card ${feature.id}`}>
          <div>
            <h2>{feature.title}</h2>
            <p>{feature.description.substring(0, 240)} </p>
            <Link
              to={`/${feature.id}`}
              aria-label={`Learn more about ${feature.title}`}
            >
              Learn More <span>{feature.title}</span>
            </Link>
          </div>

          <div>
            <div></div>
            <div></div>
            <img
              src={feature.image}
              alt={feature.title}
              width="400"
              height="400"
            />
          </div>
        </article>
      ))}
    </section>
  )
}
