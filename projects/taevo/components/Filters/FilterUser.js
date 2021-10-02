import React from "react";
import {
  IoIosClose,
  IoMdAdd,
  IoIosCheckmarkCircle,
  IoIosRemove,
} from "react-icons/io";
import { useLocation } from "react-router-dom";

import "./JobPostSidebar/JobPostSidebar.css";
import "./Filter.css";

export default function FilterUser({
  toggle,
  setToggle,
  setToggleFilter,
  stageList,
  setStages,
  groupByCategory,
}) {
  let { pathname } = useLocation();

  const provincesArray = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "kwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Western Cape",
  ];

  const stageArray = [
    "Application",
    "Selection",
    "Assessment",
    "Interview",
    "Offer",
    "Signed",
    "Unqualified",
  ];

  const statusArray = ["Yes", "No"];

  const changeArrayFilterBasedOnPath = () => {
    if (pathname.includes("training")) {
      return statusArray;
    }

    return stageArray;
  };

  const changeTitleFilterBasedOnPath = () => {
    if (pathname.includes("training")) {
      return "status";
    }

    return "stage";
  };

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
          <h4 onClick={() => setToggle("disability")}>
            <span>Disabled</span>

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
          <h4 onClick={() => setToggle("province")}>
            <span>Province</span>
            {getCategory("province").length ? (
              <button onClick={() => clearStage("province")}>
                clear filter
              </button>
            ) : (
              <>{toggle === "province" ? <IoIosRemove /> : <IoMdAdd />}</>
            )}
          </h4>
          {toggle === "province" || getCategory("province").length ? (
            <ul>
              {provincesArray.map((province, i) => {
                return (
                  <li
                    onClick={() =>
                      getCategory("province").includes(province)
                        ? removeStage(province)
                        : addStage("province", province)
                    }
                    key={i}
                  >
                    <span>{province}</span>
                    {getCategory("province").includes(province) && (
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
          <h4 onClick={() => setToggle(changeTitleFilterBasedOnPath())}>
            <span>{changeTitleFilterBasedOnPath()}</span>
            {getCategory(changeTitleFilterBasedOnPath()).length ? (
              <button
                onClick={() => clearStage(changeTitleFilterBasedOnPath())}
              >
                clear filter
              </button>
            ) : (
              <>
                {toggle === changeTitleFilterBasedOnPath() ? (
                  <IoIosRemove />
                ) : (
                  <IoMdAdd />
                )}
              </>
            )}
          </h4>
          {toggle === changeTitleFilterBasedOnPath() ||
          getCategory(changeTitleFilterBasedOnPath()).length ? (
            <ul>
              {changeArrayFilterBasedOnPath().map((stage, i) => {
                return (
                  <li
                    onClick={() =>
                      getCategory(changeTitleFilterBasedOnPath()).includes(
                        stage
                      )
                        ? removeStage(stage)
                        : addStage(changeTitleFilterBasedOnPath(), stage)
                    }
                    key={i}
                  >
                    <span>{stage}</span>
                    {getCategory(changeTitleFilterBasedOnPath()).includes(
                      stage
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
      </div>
    </aside>
  );
}
