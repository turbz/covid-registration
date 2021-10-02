import React, { useState, useEffect, useContext } from "react"
import moment from "moment"
import JobCardList from "./JobCardList/JobCardList"
import JobPagination from "./JobPagination/JobPagination"
import TaevoBlinker from "../TaevoBlinker/TaevoBlinker"
import JobPostSidebar from "../Filters/JobPostSidebar/JobPostSidebar"
import { store } from "../../libs/state"
// import NotFound from "../../NotFound/NotFound";

export default function PortalJobsContainer({
  searchTermTitle,
  searchTermType,
  searchTermProvince,
  searchTermCity,
  handleInputChange,
}) {
  const [more, setMore] = useState(0)
  const [dataset, setDataset] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(true)

  const { getSubdomain } = useContext(store)

  const dateStartStorageInput = sessionStorage.getItem("dateStartStorageInput")
  const keywordStorageInput = sessionStorage.getItem("keywordStorageInput")
  const provinceStorageInput = sessionStorage.getItem("provinceStorageInput")
  const typeStorageInput = sessionStorage.getItem("typeStorageInput")
  const natureStorageInput = sessionStorage.getItem("natureStorageInput")
  const offsetNumberStorageInput = sessionStorage.getItem(
    "offsetNumberStorageInput"
  )

  const fetchPostData = () => {
    const offset =
      more === 0 && !offsetNumberStorageInput ? 0 : offsetNumberStorageInput
    fetch(
      `/api/applications?offsetNumber=${parseInt(
        offset
      )}&limitNumber=${12}&keyword=${keywordStorageInput}&nature=${natureStorageInput}&type=${typeStorageInput}&state=${provinceStorageInput}&dateStart=${dateStartStorageInput}&dateEnd=${moment().format(
        "YYYY-MM-DD"
      )}&slug=${getSubdomain}`
    )
      .then(response => {
        if (response.ok) return response.json()
        throw new Error("Network response was not ok.")
      })
      .then(setDataset)
      .catch(console.error)
  }

  useEffect(fetchPostData, [
    getSubdomain,
    more,
    offsetNumberStorageInput,
    dateStartStorageInput,
    keywordStorageInput,
    provinceStorageInput,
    typeStorageInput,
    natureStorageInput,
  ])

  if (!dataset) {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    return loading ? (
      <div className="NewPortal-job">
        <TaevoBlinker />
      </div>
    ) : (
      <div className="NewPortal-job">
        <h2 className="error">No jobs advertised!</h2>
      </div>
    )
  }

  const createArray = length => [...Array(length)]

  let sliceArray = createArray(parseInt(dataset.posts.length / 12))
    .map((number, i) => {
      const getReminder = parseInt(
        ((dataset.posts.length / 12) % 1).toFixed(2) * 10
      )
      const getNumberOfPostsRemaining = getReminder + (getReminder >= 5 ? 2 : 1)

      if (Number(i + 1) * 12 === more) {
        return [i * 12, (i + 1) * 12, i + 1]
      }

      if (dataset.posts.length === more) {
        return [
          dataset.posts.length - getNumberOfPostsRemaining,
          dataset.posts.length,
        ]
      }

      return null
    })
    .filter(d => d)[0]

  const setLocalStorage = (storageProperty, value) => {
    setMore(0)
    sessionStorage.setItem(storageProperty, value)
    fetchPostData()
  }

  const onSearchFilter = () => {
    setLocalStorage("offsetNumberStorageInput", 0)
    setLocalStorage("keywordStorageInput", searchTermTitle)
  }

  return (
    <div className="filters">
      <JobPostSidebar
        toggle={toggle}
        setToggle={setToggle}
        setMore={setMore}
        searchTermTitle={searchTermTitle}
        searchTermProvince={searchTermProvince}
        searchTermCity={searchTermCity}
        searchTermType={searchTermType}
        handleInputChange={handleInputChange}
        keywords={dataset.keywords}
        results={dataset.posts}
        onFetchPostData={fetchPostData}
      />
      <div id="joblist">
        <div>
          <JobPagination
            jobResults={dataset.posts}
            setMore={setMore}
            jobCount={dataset.count}
            more={more}
            createArray={createArray}
            sliceArray={sliceArray}
            onFetchPostData={fetchPostData}
          />
          <div>
            <input
              type="text"
              name="searchTermTitle"
              onChange={handleInputChange}
              // onChangeCapture={onSearchTitle}
              defaultValue={keywordStorageInput}
              // onClick={() => setToggle(false)}
              placeholder="Search for job title, keywords, company"
            />
            <button onClick={onSearchFilter}>Find Job</button>
          </div>
        </div>

        <div id="cardlist" className="NewJob-cardlist">
          {dataset && (
            <JobCardList
              posts={dataset.posts}
              setMore={setMore}
              more={more}
              sliceArray={sliceArray}
              jobResults={dataset.posts}
            />
          )}

          <JobPagination
            jobResults={dataset.posts}
            jobCount={dataset.count}
            setMore={setMore}
            more={more}
            createArray={createArray}
            sliceArray={sliceArray}
            onFetchPostData={fetchPostData}
          />
        </div>
      </div>
    </div>
  )
}
