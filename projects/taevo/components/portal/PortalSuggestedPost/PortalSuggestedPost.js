import React, { useContext, useEffect, useState } from "react"
import moment from "moment"
import { BsBuilding } from "react-icons/bs"
import { Link } from "gatsby"
import { store } from "../../../../projects/taevo/libs/state"

import "./PortalSuggestedPost.css"

export default function PortalSuggestedPost({ jobTitle, postId, companyName }) {
  const [dataset, setDataset] = useState(null)

  const { getSubdomain } = useContext(store)

  const fetchPostData = () => {
    fetch(
      `/api/applications?offsetNumber=${parseInt(
        0
      )}&limitNumber=${100}&keyword=${null}&nature=${null}&type=${null}&state=${null}&dateStart=${moment()
        .subtract(3, "months")
        .format("YYYY-MM-DD")}&dateEnd=${moment().format(
        "YYYY-MM-DD"
      )}&companyNameInput=${companyName}&slug=${getSubdomain}`
    )
      .then(response => {
        if (response.ok) return response.json()
        throw new Error("Network response was not ok.")
      })
      .then(setDataset)
      .catch(console.error)
  }

  useEffect(fetchPostData, [companyName, jobTitle, getSubdomain])

  const convertStringToAnArray = jobTitle.split(" ")

  // This checks if string keyword exists in an array
  const results = dataset
    ? dataset.posts.filter(post =>
        convertStringToAnArray.some(
          job => postId !== post.post_id && post.job_title.includes(job)
        )
      )
    : []

  return (
    <div className="Portal-Suggested-Post">
      <h3>Suggested Jobs</h3>
      <div className="cardlist">
        {results.slice(0, 3).map(post => {
          let removeSpecialCharacters = post.job_title.replace(
            /[^a-zA-Z ]/g,
            " "
          )

          let replaceSpaceWithHyphen = removeSpecialCharacters
            .replace(/\s/g, "-")
            .toLowerCase()

          const onHandleUrl = () => {
            sessionStorage.setItem("postUrl", `post#${post.post_id}`)
          }

          return (
            <article>
              {post.company_logo ? (
                <figure
                  style={{
                    background: `url(${
                      window.location.origin
                    }/${post.company_logo.substring(
                      4
                    )}) no-repeat center center`,
                  }}
                ></figure>
              ) : (
                <figure>
                  <BsBuilding />
                </figure>
              )}
              <hgroup>
                <h4>
                  <Link
                    to={`/jobs/${moment(post.date_opened).format("YYYYMMDD")}/${
                      post.post_id
                    }/${replaceSpaceWithHyphen}`}
                    onClick={onHandleUrl}
                  >
                    {post.job_title}
                  </Link>
                </h4>
                <h4>
                  Closing Date:{" "}
                  {moment(post.closing_date).format("DD MMM YYYY")}
                </h4>
              </hgroup>
            </article>
          )
        })}
      </div>
    </div>
  )
}
