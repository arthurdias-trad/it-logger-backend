import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  CLEAR_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  SEARCH_LOGS,
} from "./types";

// export const getLogs = () => {
//   return async (dispatch) => {
//     setLoading();

//     const res = await fetch("/logs");
//     const data = await res.json();
//   };

//   dispatch({ type: GET_LOGS, payload: data });
// };

// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({ type: GET_LOGS, payload: data.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

// Add new log to db
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    log.date = new Date();
    const res = await fetch("/logs", {
      method: "post",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    dispatch({ type: ADD_LOG, payload: data.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

// Delete log from db
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, { method: "delete" });

    dispatch({ type: DELETE_LOG, payload: id });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

// Update log on db
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const { message, attention, tech, id } = log;
    log.date = new Date();
    const res = await fetch(`/logs/${id}`, {
      method: "put",
      body: JSON.stringify({ message, attention, tech }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    dispatch({ type: UPDATE_LOG, payload: data.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

// Search logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/logs?q=${text}`);

    const data = await res.json();
    console.log(data);

    dispatch({ type: SEARCH_LOGS, payload: data.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err });
  }
};

// Set current log
export const setCurrent = (log) => (dispatch) => {
  dispatch({ type: SET_CURRENT, payload: log });
};

// Clear current log
export const clearCurrent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING };
};
