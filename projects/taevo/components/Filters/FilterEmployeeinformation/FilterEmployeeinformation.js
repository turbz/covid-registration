import React from "react";
import {
  IoIosClose,
  IoMdAdd,
  IoIosCheckmarkCircle,
  IoIosRemove,
} from "react-icons/io";
import { useLocation } from "react-router-dom";

import "../JobPostSidebar/JobPostSidebar.css";
import "../Filter.css";

export default function FilterEmployeeinformation({
  toggle,
  setToggle,
  setToggleFilter,
  stageList,
  setStages,
  groupByCategory,
}) {
  let { pathname } = useLocation();

  const provincesArray = [
    "Top Manager",
    "Senior Manager",
    "Middle Manager",
    "Junior Manager",
    "Semi Skilled",
    "Unskilled",
  ];

  const employmentReasonArray = [
    "New Hire",
    "Returning",
    "Promotion",
    "Transfer Out",
    "Transfer In",
    "Termination",
    "Secondment",
    "Demotion",
    "Seperation",
    "Acting",
    "Deceased",
    "Retirement",
    "Dismissed",
    "Contract Expired",
    "Resignation",
    "Insolvency/Liquidation",
    "Maternity/Adoption",
    "Illness/Medical boarded",
    "Retrenched/Staff reduction",
    "Constructive dismissal**",
    "Absconded",
    "Business closed",
    "Death of Domestic Employer",
    "Voluntary severance package",
    "Reduced Work Time",
    "Commissioning Parental",
    "Parental Leave",
  ];

  const stageArray = ["Active", "Terminated"];

  const raceArray = [
    "African",
    "Coloured",
    "Indian/Asian",
    "White",
    "Non-Citizen",
  ];

  const getCategory = (category) => {
    if (groupByCategory && groupByCategory[category]) {
      return groupByCategory[category];
    }

    return [];
  };

  const addStage = (category, value) => {
    setStages([
      ...stageList,
      {
        category,
        value,
      },
    ]);
  };

  const removeStage = async (value) => {
    setStages(() => stageList.filter((item) => item.value !== value));
    if (stageList.length === 1) {
      sessionStorage.removeItem("stageStorageInput");
    }
  };

  const clearStage = (category) => {
    setStages(() => stageList.filter((item) => item.category !== category));
    if (getCategory(category)) {
      sessionStorage.setItem(
        "stageStorageInput",
        stageList.filter((item) => item.category !== category)
      );
    }
  };

  const boleanRemoveStage = (category, value) => {
    if (getCategory(category).length && getCategory(category).includes(value)) {
      return removeStage(value);
    }

    addStage(category, value);
  };

  return (
    <aside className="posts-sidebar filter-user">
      <h3>
        <span>Filter By</span>
        <span onClick={() => setToggleFilter(false)}>
          <IoIosClose />
        </span>
      </h3>
      <div>
        <div>
          <h4 onClick={() => setToggle("gender")}>
            <span>Gender/Sex</span>

            {getCategory("gender").length ? (
              <button onClick={() => clearStage("gender")}>clear filter</button>
            ) : (
              <>{toggle === "gender" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          <label></label>
          {toggle === "gender" || getCategory("gender").length ? (
            <ul>
              <li onClick={() => boleanRemoveStage("gender", "F")}>
                <span>Female</span>
                {getCategory("gender").includes("F") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li onClick={() => boleanRemoveStage("gender", "M")}>
                <span>Male</span>
                {getCategory("gender").includes("M") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
            </ul>
          ) : null}
        </div>

        <div>
          <h4 onClick={() => setToggle("race")}>
            <span>Race</span>
            {getCategory("race").length ? (
              <button onClick={() => clearStage("race")}>clear filter</button>
            ) : (
              <>{toggle === "race" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {toggle === "race" || getCategory("race").length ? (
            <ul>
              {raceArray.map((race, i) => {
                return (
                  <li
                    onClick={() =>
                      getCategory("race").includes(race)
                        ? removeStage(race)
                        : addStage("race", race)
                    }
                    key={i}
                  >
                    <span>{race}</span>
                    {getCategory("race").includes(race) && (
                      <span>
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div>
          <h4 onClick={() => setToggle("toe")}>
            <span>Type of Employment</span>
            {getCategory("toe").length ? (
              <button onClick={() => clearStage("toe")}>clear filter</button>
            ) : (
              <>{toggle === "toe" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {toggle === "toe" || getCategory("toe").length ? (
            <ul>
              <li onClick={() => boleanRemoveStage("toe", "Permanent")}>
                <span>Permanent</span>
                {getCategory("toe").includes("Permanent") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li
                onClick={() => boleanRemoveStage("toe", "Fixed Term Contract")}
              >
                <span>Fixed Term Contract</span>
                {getCategory("toe").includes("Fixed Term Contract") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li onClick={() => boleanRemoveStage("toe", "Temporary")}>
                <span>Temporary</span>
                {getCategory("toe").includes("Temporary") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
            </ul>
          ) : null}
        </div>

        <div>
          <h4 onClick={() => setToggle("disability")}>
            <span>Disability</span>

            {getCategory("disability").length ? (
              <button onClick={() => clearStage("disability")}>
                clear filter
              </button>
            ) : (
              <>{toggle === "disability" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          <label></label>
          {toggle === "disability" || getCategory("disability").length ? (
            <ul>
              <li onClick={() => boleanRemoveStage("disability", "Yes")}>
                <span>Yes</span>
                {getCategory("disability").includes("Yes") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
              <li onClick={() => boleanRemoveStage("disability", "No")}>
                <span>No</span>
                {getCategory("disability").includes("No") && (
                  <span>
                    <IoIosCheckmarkCircle />
                  </span>
                )}
              </li>
            </ul>
          ) : null}
        </div>

        <div>
          <h4 onClick={() => setToggle("occupational_level")}>
            <span>Occupational Level</span>
            {getCategory("occupational_level").length ? (
              <button onClick={() => clearStage("occupational_level")}>
                clear filter
              </button>
            ) : (
              <>
                {toggle === "occupational_level" ? (
                  <IoIosRemove />
                ) : (
                  <IoMdAdd />
                )}
              </>
            )}
          </h4>
          {toggle === "occupational_level" ||
          getCategory("occupational_level").length ? (
            <ul>
              {provincesArray.map((province, i) => {
                return (
                  <li
                    onClick={() =>
                      getCategory("occupational_level").includes(province)
                        ? removeStage(province)
                        : addStage("occupational_level", province)
                    }
                    key={i}
                  >
                    <span>{province}</span>
                    {getCategory("occupational_level").includes(province) && (
                      <span>
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div>
          <h4 onClick={() => setToggle("employment_reason")}>
            <span>Employment Reason</span>
            {getCategory("employment_reason").length ? (
              <button onClick={() => clearStage("employment_reason")}>
                clear filter
              </button>
            ) : (
              <>
                {toggle === "employment_reason" ? <IoIosRemove /> : <IoMdAdd />}
              </>
            )}
          </h4>
          {toggle === "employment_reason" ||
          getCategory("employment_reason").length ? (
            <ul>
              {employmentReasonArray.map((employment_reason, i) => {
                return (
                  <li
                    onClick={() =>
                      getCategory("employment_reason").includes(
                        employment_reason
                      )
                        ? removeStage(employment_reason)
                        : addStage("employment_reason", employment_reason)
                    }
                    key={i}
                  >
                    <span>{employment_reason}</span>
                    {getCategory("employment_reason").includes(
                      employment_reason
                    ) && (
                      <span>
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div style={pathname.includes("contacts") ? { display: "none" } : null}>
          <h4 onClick={() => setToggle("status")}>
            <span>Status</span>
            {getCategory("status").length ? (
              <button onClick={() => clearStage("status")}>clear filter</button>
            ) : (
              <>{toggle === "status" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {toggle === "status" || getCategory("status").length ? (
            <ul>
              {stageArray.map((stage, i) => {
                return (
                  <li
                    onClick={() =>
                      getCategory("status").includes(stage)
                        ? removeStage(stage)
                        : addStage("status", stage)
                    }
                    key={i}
                  >
                    <span>{stage}</span>
                    {getCategory("status").includes(stage) && (
                      <span>
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
