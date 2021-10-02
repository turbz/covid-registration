import React from "react"
import PortalLayout from "../components/portal/portal-layout"
import PortalBanner from "../components/portal/PortalBanner/PortalBanner"
import PortalJobsContainer from "../components/portal/PortalJobsContainer"

import "./PortalJobs.css"

export default function jobs({
  searchTermTitle,
  searchTermType,
  searchTermProvince,
  searchTermCity,
  handleInputChange,
  searchOpeningDate,
  clearSearch,
}) {
  return (
    <PortalLayout>
      <section id="jobs" className="Portal-Jobs">
        <div className="wrapper">
          <PortalBanner />
          <PortalJobsContainer
            searchTermTitle={searchTermTitle}
            searchTermType={searchTermType}
            searchTermProvince={searchTermProvince}
            searchTermCity={searchTermCity}
            handleInputChange={handleInputChange}
            searchOpeningDate={searchOpeningDate}
            clearSearch={clearSearch}
          />
        </div>
      </section>
    </PortalLayout>
  )
}
