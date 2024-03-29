import { ThunkAction } from "redux-thunk";
import { registerApi } from "../../api/api";
import { setError, setStatus } from "../../app/app-reducer";

const SET_REG = "SET_REG";

type SetReg = {
  type: typeof SET_REG;
  payload: {
    email: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
  };
};

type InitialStateType = {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
};

const initialState: InitialStateType = {
  email: null,
  password: null,
  firstName: null,
  lastName: null,
};

export const registerReducer = (state = initialState, action: SetReg) => {
  switch (action.type) {
    case SET_REG: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

// eslint-disable-next-line no-redeclare
const SetRegister = (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): SetReg => {
  return {
    type: SET_REG,
    payload: {
      email,
      password,
      firstName,
      lastName,
    },
  };
};

type ThunkType = ThunkAction<any, any, any, any>;

export const register = (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      registerApi
        .register(email, firstName, lastName, password)
        .then((response) => {
          response.status = 201;
          dispatch(SetRegister(email, firstName, lastName, password));
          dispatch(setStatus("succeeded"));
          dispatch(setStatus("confirm"));
        })
        .catch((error) => {
          console.log(error.response.data);
          dispatch(setError(error.response.data));
          dispatch(setStatus("succeeded"));
        });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };
};
