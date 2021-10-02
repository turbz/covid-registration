import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "./JobPagination.css";

export default function JobPagination({
  createArray,
  more,
  setMore,
  jobCount,
  jobResults,
}) {
  const offsetNumberStorageInput = parseInt(
    sessionStorage.getItem("offsetNumberStorageInput")
  );
  const offset =
    more === 0 && !offsetNumberStorageInput
      ? 0
      : parseInt(sessionStorage.getItem("offsetNumberStorageInput"));

  const paginationPosition =
    offset >= 24
      ? [Math.abs((offset + 12) / 12 - 2), (offset + 12) / 12 + 1]
      : [0, 3];

  const handlePaginationOffset = async (value) => {
    setMore(value);
    sessionStorage.setItem("offsetNumberStorageInput", value);
  };

  return (
    <ul className="Job-Pagination">
      {offset >= 24 && (
        <li
          className="arrow"
          onClick={() => handlePaginationOffset(offset - 12)}
        >
          {" "}
          <a href="#joblist">
            <IoIosArrowBack />
          </a>
        </li>
      )}

      {Object.keys(createArray(parseInt(jobCount / 12)))
        .slice(paginationPosition[0], paginationPosition[1])
        .map((number, i) => {
          return (
            <li
              key={i}
              onClick={() => handlePaginationOffset(parseInt(number) * 12)}
            >
              <a
                style={
                  Number(parseInt(number)) * 12 === offset
                    ? {
                        color: "#fff",
                        backgroundColor: "#323742",
                      }
                    : null
                }
                href="#joblist"
              >
                {parseInt(number) + 1}
              </a>
            </li>
          );
        })}

      {jobCount % 12 < 12 && jobCount >= 12 && (
        <li onClick={() => handlePaginationOffset(jobCount - (jobCount % 12))}>
          <a
            style={
              (jobCount % 12) + offset === Number(jobCount)
                ? {
                    color: "#fff",
                    backgroundColor: "#323742",
                  }
                : null
            }
            href="#joblist"
          >
            {parseInt(jobCount / 12 + 1)}
          </a>
        </li>
      )}

      {jobCount >= 36 && jobResults.length / 12 === 1 && (
        <li
          className="arrow right"
          onClick={() => handlePaginationOffset(offset + 12)}
        >
          <a href="#joblist">
            <IoIosArrowForward />
          </a>
        </li>
      )}
    </ul>
  );
}
