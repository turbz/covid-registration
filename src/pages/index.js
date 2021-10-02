import React from "react"
import CovidQuestions from "../components/covidquestions"
import CovidScreeningForm from "../components/covidscreeningform"

export default function index() {
  return (
    <main>
      <div className="questions">
        <CovidQuestions />
      </div>
      <div className="forms">
        <CovidScreeningForm />
      </div>
    </main>
  )
}
