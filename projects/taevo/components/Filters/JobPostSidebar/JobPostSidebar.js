import moment from "moment";
import React from "react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";

import "./JobPostSidebar.css";

export default function JobPostSidebar({
  toggle,
  setToggle,
  handleInputChange,
  results,
  keywords,
  onFetchPostData,
  setMore,
}) {
  const provinceStorageInput = sessionStorage.getItem("provinceStorageInput");
  const keywordStorageInput = sessionStorage.getItem("keywordStorageInput");
  const typeStorageInput = sessionStorage.getItem("typeStorageInput");
  const natureStorageInput = sessionStorage.getItem("natureStorageInput");
  const dateStartStorageInput = sessionStorage.getItem("dateStartStorageInput");

  // const filteredArr = window.location.pathname
  //   .split("/")
  //   .join(" ")
  //   .toLowerCase()
  //   .includes("jobs".toLocaleLowerCase())
  //   ? posts.reduce((acc, current) => {
  //       const x = acc.find((item) => item.city === current.city);
  //       if (!x) {
  //         return acc.concat([current]);
  //       } else {
  //         return acc;
  //       }
  //     }, [])
  //   : [];

  // let filterProvince = filteredArr.filter(
  //   (item) => item.province === provinceStorageInput
  // );

  const splitJobTitle = results.flatMap((keyword) => {
    return keyword.job_title.split(/[^A-Z0-9]/gi);
  });

  const groupByKeywords = splitJobTitle.reduce((prev, cur) => {
    if (!prev[cur]) {
      prev[cur] = [];
    }

    prev[cur].push(isNaN(cur) ? cur : []);

    return prev;
  }, {});

  const keywordsArray = Object.keys(groupByKeywords)
    .filter((d) => isNaN(d))
    .map((key) => {
      return {
        keyword: key,
        value: groupByKeywords[key].length,
      };
    })
    .sort((a, b) => b.value - a.value);

  const provincesArray = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "kwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Northern Cape",
    "Western Cape",
  ];

  const setLocalStorage = async (storageProperty, value) => {
    setMore(0);
    await onFetchPostData();
    sessionStorage.setItem(storageProperty, value);
    sessionStorage.removeItem("offsetNumberStorageInput");
  };

  const setTypeLocalStorage = async (
    storageProperty,
    value,
    removeProperty
  ) => {
    setMore(0);
    await onFetchPostData();
    sessionStorage.setItem(storageProperty, value);
    sessionStorage.removeItem(removeProperty);
    sessionStorage.removeItem("offsetNumberStorageInput");
  };

  const removeLocalStorage = async (storageProperty) => {
    setMore(0);
    await onFetchPostData();
    sessionStorage.removeItem(storageProperty);
  };

  return (
    <aside className="posts-sidebar">
      <h3>Find Jobs</h3>
      <div>
        <div>
          <h4 onClick={() => setToggle("type")}>
            <span>Filter By</span>

            {typeStorageInput || natureStorageInput ? (
              <span
                onClick={() => {
                  if (natureStorageInput) {
                    return removeLocalStorage("natureStorageInput");
                  }

                  return removeLocalStorage("typeStorageInput");
                }}
              >
                clear filter
              </span>
            ) : (
              <>{toggle === "type" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          <label></label>
          {(toggle === "type" || typeStorageInput) && (
            <ul>
              <li
                onClick={() =>
                  setTypeLocalStorage(
                    "typeStorageInput",
                    "Permanent",
                    "natureStorageInput"
                  )
                }
              >
                <span>Permanent</span>
                {typeStorageInput === "Permanent" && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setTypeLocalStorage(
                    "typeStorageInput",
                    "Contract",
                    "natureStorageInput"
                  )
                }
              >
                <span>Contract</span>
                {typeStorageInput === "Contract" && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setTypeLocalStorage(
                    "natureStorageInput",
                    "Full",
                    "typeStorageInput"
                  )
                }
              >
                <span>Full-Time</span>
                {natureStorageInput === "Full" && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setTypeLocalStorage(
                    "natureStorageInput",
                    "Part",
                    "typeStorageInput"
                  )
                }
              >
                <span>Part-Time</span>
                {natureStorageInput === "Part" && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setTypeLocalStorage(
                    "typeStorageInput",
                    "Temporary",
                    "natureStorageInput"
                  )
                }
              >
                <span>Temporary</span>
                {typeStorageInput === "Temporary" && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
            </ul>
          )}
        </div>

        <div>
          <h4 onClick={() => setToggle("date")}>
            <span>Date Posted</span>

            {dateStartStorageInput ? (
              <span onClick={() => removeLocalStorage("dateStartStorageInput")}>
                clear filter
              </span>
            ) : (
              <>{toggle === "date" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          <label></label>
          {(toggle === "date" || dateStartStorageInput) && (
            <ul>
              <li
                onClick={() =>
                  setLocalStorage(
                    "dateStartStorageInput",
                    moment().subtract(1, "days").format("YYYY-MM-DD")
                  )
                }
              >
                <span>Last 24 hours</span>
                {dateStartStorageInput ===
                  moment().subtract(1, "days").format("YYYY-MM-DD") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setLocalStorage(
                    "dateStartStorageInput",
                    moment().subtract(3, "days").format("YYYY-MM-DD")
                  )
                }
              >
                <span>Last 3 days</span>
                {dateStartStorageInput ===
                  moment().subtract(3, "days").format("YYYY-MM-DD") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setLocalStorage(
                    "dateStartStorageInput",
                    moment().subtract(7, "days").format("YYYY-MM-DD")
                  )
                }
              >
                <span>Last 7 days</span>
                {dateStartStorageInput ===
                  moment().subtract(7, "days").format("YYYY-MM-DD") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setLocalStorage(
                    "dateStartStorageInput",
                    moment().subtract(14, "days").format("YYYY-MM-DD")
                  )
                }
              >
                <span>Last 14 days</span>
                {dateStartStorageInput ===
                  moment().subtract(14, "days").format("YYYY-MM-DD") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() =>
                  setLocalStorage(
                    "dateStartStorageInput",
                    moment().subtract(30, "days").format("YYYY-MM-DD")
                  )
                }
              >
                <span>Last 30 days</span>
                {dateStartStorageInput ===
                  moment().subtract(30, "days").format("YYYY-MM-DD") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
            </ul>
          )}
        </div>

        <div>
          <h4 onClick={() => setToggle("search")}>
            <span>Job Function</span>
            {keywordStorageInput ? (
              <span onClick={() => removeLocalStorage("keywordStorageInput")}>
                clear filter
              </span>
            ) : (
              <>{toggle === "search" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {(toggle === "search" || keywordStorageInput) && (
            <ul>
              {keywordsArray.slice(0, 10).map((category, i) => (
                <li
                  onClick={() =>
                    setLocalStorage("keywordStorageInput", category.keyword)
                  }
                  ley={Number(i) + 1}
                >
                  <span>{category.keyword}</span>
                  {keywordStorageInput &&
                    keywordStorageInput
                      .toLocaleLowerCase()
                      .includes(category.keyword.toLocaleLowerCase()) && (
                      <span>
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4 onClick={() => setToggle("province")}>
            <span>Province</span>
            {provinceStorageInput ? (
              <span onClick={() => removeLocalStorage("provinceStorageInput")}>
                clear filter
              </span>
            ) : (
              <>{toggle === "province" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {(toggle === "province" || provinceStorageInput) && (
            <ul>
              {provincesArray.map((province, i) => (
                <li
                  onClick={() =>
                    setLocalStorage("provinceStorageInput", province)
                  }
                  key={i}
                >
                  <span>{province}</span>
                  {provinceStorageInput &&
                    provinceStorageInput
                      .toLocaleLowerCase()
                      .includes(province.toLocaleLowerCase()) && (
                      <span>
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* <div className="city">
          <h4 onClick={() => setToggle("city")}>
            <span>City</span>
            {searchTermCity ? (
              <span>
                clear filter
                <input
                  type="radio"
                  name="searchTermCity"
                  value=""
                  onChange={handleInputChange}
                />
              </span>
            ) : (
              <>{toggle === "province" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {(toggle === "city" || provinceStorageInput) && (
            <ul>
              {filterProvince.map((job) => (
                <li key={job.post_id}>
                  <input
                    type="checkbox"
                    name="searchTermCity"
                    value={job.city}
                    onChange={handleInputChange}
                    onClick={() => setToggle(false)}
                  />
                  <span>{job.city}</span>
                  {searchTermCity === job.city && (
                    <span>
                      <IoIosCheckmarkCircle />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
       */}
      </div>
    </aside>
  );
}
