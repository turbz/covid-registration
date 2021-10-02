import React, { useEffect } from "react"
import LayoutNavigation from "../components/layout-navigation"
import { service } from "../components/services_content"

export default function Services() {
  const featured = service.filter(feature => feature.id === "headcount")

  let dotsArray = []

  for (let count = 0; count < 12000; count++) {
    dotsArray.push(count)
  }

  useEffect(() => {
    const element = document.getElementById("gatsby-focus-wrapper")
    element.classList.add("about-header")
  }, [])

  return (
    <LayoutNavigation>
      <div className="Service-page">
        <div>
          <header>
            <div>
              <img src={featured[0].image} alt={featured[0].title} />
              <div></div>
              <div></div>
            </div>
            <div>
              <h2>{featured[0].title}</h2>
              <p>{featured[0].description}</p>
            </div>
            <div></div>
          </header>
          <footer>
            <div>
              {dotsArray.map(dot => (
                <span key={dot}></span>
              ))}
            </div>
            <div className="card">
              <ul>
                {featured[0].features.map((feature, i) => (
                  <li key={i}>
                    <span>{i + 1}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </LayoutNavigation>
  )
}
