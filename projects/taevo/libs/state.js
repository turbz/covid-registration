import React, { useReducer, useEffect, createContext } from "react"

const initialState = {
  loading: false,
  userProfile: null,
  recruiter: null,
  employee: null,
  error: "",
}

export const store = createContext(initialState)

const { Provider } = store

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return {
        loading: true,
        userProfile: action.payload,
        employee: null,
        recruiter: null,
        error: "",
      }

    case "FETCH_EMPLOYEE_DATA":
      return {
        loading: true,
        employee: action.payload,
        userProfile: null,
        recruiter: null,
        error: "",
      }

    case "FETCH_RECRUITER_DATA":
      return {
        loading: true,
        recruiter: action.payload,
        userProfile: null,
        employee: null,
        error: "",
      }

    case "ERROR":
      return {
        loading: true,
        userProfile: null,
        employee: null,
        recruiter: null,
        error: "Failed to Authenticate User",
      }

    default:
      return state
  }
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  let hostname = typeof window !== `undefined` ? window.location.hostname : ""

  let getSubdomain =
    hostname.includes("netlify") || hostname.includes("localhost")
      ? "demo"
      : hostname.split(".")[0]

  const fetchData = () => {
    fetchRecruiterData(getSubdomain)
    fetchUserData(getSubdomain)
    fetchEmployeeData(getSubdomain)
  }

  useEffect(fetchData, [getSubdomain])

  const fetchUserData = value => {
    fetch(`/api/user/profile?slug=${value}`)
      .then(res => {
        if (res.status !== 200) throw new Error()
        return res.json()
      })
      .then(data => {
        dispatch({ type: "FETCH_USER_DATA", payload: data })
        console.log(data)
      })
      .catch(() => {
        dispatch({ type: "ERROR" })
      })
  }

  const fetchRecruiterData = value => {
    fetch(`/api/recruiter/profile?slug=${value}`)
      .then(res => {
        if (res.status !== 200) throw new Error()
        return res.json()
      })
      .then(data => {
        dispatch({ type: "FETCH_RECRUITER_DATA", payload: data })
      })
      .catch(() => {
        dispatch({ type: "ERROR" })
      })
  }

  const fetchEmployeeData = value => {
    fetch(`/api/profile?slug=${value}`)
      .then(res => {
        if (res.status !== 200) throw new Error()
        return res.json()
      })
      .then(data => {
        dispatch({ type: "FETCH_EMPLOYEE_DATA", payload: data })
      })
      .catch(error => {
        dispatch({ type: "ERROR" })
      })
  }

  let recruiter = state.recruiter
  let userProfile = state.userProfile

  return (
    <Provider
      value={{
        state,
        recruiter,
        userProfile,
        dispatch,
        fetchRecruiterData,
        fetchUserData,
        getSubdomain,
      }}
    >
      {children}
    </Provider>
  )
}
