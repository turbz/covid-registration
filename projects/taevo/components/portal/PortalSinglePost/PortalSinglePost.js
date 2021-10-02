import React, { useContext, useState } from "react"
import DOMPurify from "dompurify"
import moment from "moment"
import { store } from "../../../../projects/taevo/libs/state"
import { IoIosArrowBack } from "react-icons/io"
import { Link } from "gatsby"
import NotFound from "../../NotFound/NotFound"
import TaevoBlinker from "../../TaevoBlinker/TaevoBlinker"
import PortalSuggestedPost from "../PortalSuggestedPost/PortalSuggestedPost"

// import {
//   TwitterShareButton,
//   TwitterIcon,
//   FacebookShareButton,
//   FacebookIcon,
//   LinkedinShareButton,
//   LinkedinIcon,
// } from "react-share"

import "./PortalSinglePost.css"

export default function PortalSinglePost({ props }) {
  const [loading, setLoading] = useState(true)

  const { navigate, pageContext } = props

  const { state, fetchUserData, getSubdomain } = useContext(store)
  const { recruiter, userProfile } = state

  const history = navigate
  const getPost = pageContext.post

  const timeoutRef = React.useRef(null)

  const onScrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current)
    }
    window.scroll(0, window.pageYOffset - 400)
  }

  const scrollToTop = () => {
    timeoutRef.current = setInterval(onScrollStep, 0)
    history.push("/jobs")
  }

  // if (!getPost) {
  //   return loading ? (
  //     <div className="NewPortal-job">
  //       <TaevoBlinker />
  //     </div>
  //   ) : (
  //     <NotFound />
  //   )
  // }

  const onHandleSubmit = async () => {
    await fetch(`/api/job/application?slug=${getSubdomain}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userProfile.user_id,
        post_id: getPost.post_id,
      }),
    })
      .then(res => res.json())
      .then(() => fetchUserData(getSubdomain))
      .catch(err => console.log(err))
  }

  const createMarkup = html => {
    return {
      __html: typeof window !== `undefined` && DOMPurify.sanitize(html),
    }
  }

  const setPostId = () => {
    localStorage.setItem("postId", getPost.post_id)
  }

  const checkIfUserApplied =
    userProfile &&
    userProfile.applications.filter(
      applicatiion => applicatiion.post_id === getPost.post_id
    )

  const paragraphs = getPost.job_description.split("</p>")

  const getHTMLArray = paragraphs.filter(p => {
    if (p.substring(0, 3).includes(`<p>`)) {
      return p
    }

    return null
  })

  return (
    <div id="post" className="NewPortal-job">
      {(moment().diff(getPost.closing_date, "days") > 0 ||
        getPost.status === "Closed") && (
        <p className="closed">This vacancy is closed</p>
      )}

      <article
        key={getPost.post_id}
        className="card  animate__animated animate__fadeIn"
      >
        <div className="details">
          <div className="wrapper">
            <div>
              {history && history.action !== "POP" ? (
                <h4
                  // style={{
                  //   marginTop:
                  //     (moment().diff(getPost.closing_date, "days") > 0 ||
                  //       getPost.status === "Closed") &&
                  //     "2em",
                  // }}
                  onClick={scrollToTop}
                >
                  <IoIosArrowBack />
                  <span>Return Back </span>
                </h4>
              ) : (
                <h4
                  // style={{
                  //   marginTop:
                  //     (moment().diff(getPost.closing_date, "days") > 0 ||
                  //       getPost.status === "Closed") &&
                  //     "2em",
                  // }}
                  onClick={() => window.location.assign("/")}
                >
                  <IoIosArrowBack />
                  <span>Return Back </span>
                </h4>
              )}

              <hgroup>
                <h3>{getPost.job_title}</h3>
                <h4>
                  <span>Company</span>: {getPost.company_name}
                </h4>
              </hgroup>
              <ul>
                <li style={{ display: !getPost.province && "none" }}>
                  <span>Province</span>
                  <span>{getPost.province}</span>
                </li>
                <li style={{ display: !getPost.city && "none" }}>
                  <span>City/Town</span>
                  <span>{getPost.city}</span>
                </li>
                <li style={{ display: !getPost.noe && !getPost.toe && "none" }}>
                  <span>Type</span>
                  <span>
                    {getPost.noe} {getPost.toe && "- " + getPost.toe}
                  </span>
                </li>
              </ul>
            </div>

            {recruiter && (
              <Link to={`/company/post`} onClick={setPostId}>
                <span>Edit</span>
              </Link>
            )}
            {!recruiter &&
            !userProfile &&
            moment().diff(getPost.closing_date, "days") <= 0 ? (
              getPost.url_link ? (
                <a
                  href={getPost.url_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Apply</span>
                </a>
              ) : (
                <Link to="/user/login">
                  <span>Login to Apply</span>
                </Link>
              )
            ) : null}

            {userProfile && moment().diff(getPost.closing_date, "days") <= 0 ? (
              userProfile.first_name && userProfile.cellphone ? (
                <>
                  {getPost.url_link !== null ? (
                    <a
                      href={getPost.url_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Apply</span>
                    </a>
                  ) : checkIfUserApplied.length ? (
                    <Link to={window.location.pathname}>
                      <span>Applied</span>
                    </Link>
                  ) : (
                    <Link
                      to={window.location.pathname}
                      type="submit"
                      onClick={onHandleSubmit}
                    >
                      <span>Submit an application</span>
                    </Link>
                  )}
                  {/* ) : (
                    <button>Not Qualified</button>
                  )} */}
                </>
              ) : getPost.url_link ? (
                <a
                  href={getPost.url_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Apply</span>
                </a>
              ) : (
                <Link to={`/profile/resume`}>
                  <span>Complete profile</span>
                </Link>
              )
            ) : null}
          </div>
        </div>
        <div className="description">
          {getPost.job_description && (
            <div
              className="content"
              dangerouslySetInnerHTML={createMarkup(getPost.job_description)}
            ></div>
          )}

          <div className="post-footer">
            <ul>
              <li style={{ display: !getPost.date_opened && "none" }}>
                <span>Date Posted</span>
                <span>{moment(getPost.date_opened).format("DD MMM YYYY")}</span>
              </li>
              <li style={{ display: !getPost.closing_date && "none" }}>
                <span>Closing Date</span>
                <span>
                  {moment(getPost.closing_date).format("DD MMM YYYY")}
                </span>
              </li>
            </ul>
            <PortalSuggestedPost
              jobTitle={getPost.job_title}
              postId={getPost.post_id}
              companyName={getPost.company_name}
            />
            <div className="social-media">
              <h5>Share on</h5>
              {/* <ul>
                  <li>
                    <TwitterShareButton url={window.location.href}>
                      <TwitterIcon />
                    </TwitterShareButton>
                  </li>
                  <li>
                    <FacebookShareButton url={window.location.href}>
                      <FacebookIcon />
                    </FacebookShareButton>
                  </li>
                  <li>
                    <LinkedinShareButton url={window.location.href}>
                      <LinkedinIcon />
                    </LinkedinShareButton>
                  </li>
                </ul>
               */}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
