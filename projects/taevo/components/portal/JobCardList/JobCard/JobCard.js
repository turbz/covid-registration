import React, { useEffect } from "react"
import moment from "moment"
import { Link } from "gatsby"
import { BsBuilding } from "react-icons/bs"
import DOMPurify from "dompurify"

import "./JobCard.css"

export default function JobCard({
  post_id,
  job_title,
  province,
  company_image,
  company_logo,
  city,
  toe,
  noe,
  status,
  date_opened,
  job_description,
  closing_date,
}) {
  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }

  let removeSpecialCharacters = job_title.replace(/[^a-zA-Z ]/g, " ")

  let replaceSpaceWithHyphen = removeSpecialCharacters
    .replace(/\s/g, "-")
    .toLowerCase()

  let paragraphs = job_description.split("</p>")

  const getHTMLArray = paragraphs.filter(p => {
    if (p.substring(0, 3) === "<p>") {
      return p
    }

    return null
  })[0]

  const onHandleUrl = () => {
    sessionStorage.setItem("postUrlId", `post#${post_id}`)
  }

  useEffect(() => {
    const prevUrl = sessionStorage.getItem("postUrlId", `post#${post_id}`)

    if (prevUrl) {
      document.getElementById(prevUrl) &&
        document.getElementById(prevUrl).scrollIntoView()
      sessionStorage.removeItem("postUrlId")
    }
  })

  return (
    <article id={`post#${post_id}`} className="card">
      <div>
        <Link
          style={{
            backgroundColor:
              (moment().diff(closing_date, "days") > 0 ||
                status === "Closed") &&
              "#f16162",
          }}
          to={`/jobs/${moment(date_opened).format(
            "YYYYMMDD"
          )}/${post_id}/${replaceSpaceWithHyphen}`}
          onClick={onHandleUrl}
        >
          <span>view details</span>
        </Link>
        <footer>
          {company_logo ? (
            <figure
              style={{
                background: `url(${
                  window.location.origin
                }/${company_logo.substring(4)}) no-repeat left center`,
              }}
            ></figure>
          ) : (
            <BsBuilding />
          )}

          <h3>{job_title.substring(0, 65)}</h3>
          <ul>
            <li style={{ display: !toe && !noe && "none" }}>
              <span>{toe ? toe : noe}</span>
              <span></span>
            </li>
            <li style={{ display: !closing_date && "none" }}>
              <span>{moment(closing_date).format("DD MMM YYYY")}</span>
              <span></span>
            </li>
          </ul>
        </footer>
      </div>
      {job_description && (
        <Link
          to={`/jobs/${moment(date_opened).format(
            "YYYYMMDD"
          )}/${post_id}/${replaceSpaceWithHyphen}`}
          className="paragraph"
          onClick={onHandleUrl}
        >
          {getHTMLArray !== undefined ? (
            getHTMLArray.substring(3).substring(0, 200)
          ) : (
            <div
              className="content"
              dangerouslySetInnerHTML={createMarkup(
                job_description.slice(0, 200)
              )}
            ></div>
          )}
        </Link>
      )}
    </article>
  )
}
