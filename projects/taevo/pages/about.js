import React, { useEffect } from "react"
import LayoutNavigation from "../components/layout-navigation"

import "./about.css"

export default function About() {
  useEffect(() => {
    const element = document.getElementById("gatsby-focus-wrapper")
    element.classList.add("about-header")
  }, [])

  return (
    <LayoutNavigation>
      <section className="About">
        <div>
          <h4>
            <span></span>
            <span>About Us</span>
          </h4>
          <h2>
            Easy to implement, secure, flexible, intuitive, reliable, visually
            engaging, and works across multiple devices
          </h2>
          <p>
            Taevo is a South African technology company that provides human
            resources software as a service to small and medium companies,
            founded in 2020 by Thabiso Mohatlane, based in Gauteng,
            Johannesburg.
          </p>
          <p>
            Taevo services include payroll, time & attendance, employee
            headcount management, recruiting & hiring and training &
            development. Our software streamlines HR activities to improve the
            environment in which an HR professional must operate, how they find
            and place qualified employees in the organisation, assessing and
            developing them and then retaining or keeping them in the
            organisation and managing employment relations. Taevo will also help
            companies cut costs, improve connectivity and efficiency and
            increase business effectiveness, thus moving from labour-intensive
            to technology-intensive activities.
          </p>
        </div>
      </section>
    </LayoutNavigation>
  )
}
