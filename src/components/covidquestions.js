import React from "react"
import { covidQuestions } from "./covidquestions.module.css"

export default function CovidQuestions() {
  return (
    <div className={covidQuestions}>
      <h1>Covid Screening Questions</h1>
      <ol>
        <li>I have not been diagnosed with COVID-19 in the last 14 days.</li>
        <li>
          In the last 14 days I have not been in contact with anyone who has
          been diagnosed with COVID19 or who is isolating because of the
          symptoms indicative of COVID-19. This does not apply if you have been
          in contact with a COVID-positive patient in your capacity as a
          healthcare worker wearing appropriate PPE.
        </li>
        <li>
          Within the last 14 days I have not experienced any of the symptoms
          associated with COVID-19 (difficulty breathing, cough, fever, loss of
          taste or smell). For full list of symptoms visit:
          https://www.who.int/health-topics/coronavirus#tab=tab_3
        </li>
        <li>
          I am aware of the physical distancing guidelines published by WHO
          (Details can be found in the following document: Preventing the Spread
          of COVID-19:
          https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public)
        </li>
      </ol>

      <h4>Be advised that: </h4>
      <ul>
        <li>
          Procedure Masks are mandatory at Church. Face shields are optional.
        </li>
        <li>
          A distance of at least 1 meter to others must be maintained at all
          times.
        </li>
        <li>
          High touch surfaces and shared tools have to be cleaned after use.
        </li>
      </ul>
    </div>
  )
}
