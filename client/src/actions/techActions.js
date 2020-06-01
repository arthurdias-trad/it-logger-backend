import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_LOADING,
} from "../actions/types";

// Get techs from database
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/techs");
    const data = await res.json();

    dispatch({ type: GET_TECHS, payload: data.data });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err.response.statusText });
  }
};

// Add tech to db
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/techs", {
      method: "post",
      body: JSON.stringify(tech),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    dispatch({ type: ADD_TECH, payload: data.data });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err });
  }
};

// Delete tech from db
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/techs/${id}`, { method: "delete" });

    dispatch({ type: DELETE_TECH, payload: id });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err });
  }
};

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING };
};
