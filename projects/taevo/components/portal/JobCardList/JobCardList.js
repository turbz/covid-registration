import React from "react";
// import DOMPurify from "dompurify";
import JobCard from "./JobCard/JobCard";

import "./JobCardList.css";

export default function JobCardList({ jobResults }) {
  return (
    <>
      {jobResults.length ? (
        jobResults.map((job) => <JobCard key={job.post_id} {...job} />)
      ) : (
        <p className="empty">No results found!</p>
      )}
    </>
  );
}
