import { ThunkAction } from "redux-thunk";
import { setError, setStatus } from "../../../../app/app-reducer";
import { postsApi } from "../../../../api/api";
import { CategoriesType } from "../../Post/PostCard";

const ADD_POST = "ADD_POST";

type SetPost = {
  type: typeof ADD_POST;
  payload: {
    id: number;
    title: string;
    content: string;
    categories: CategoriesType[];
  };
};

const initialState = {
  id: null,
  title: null,
  content: null,
  categories: null,
};

export const addPostReducer = (state = initialState, action: SetPost) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

const SetAddPost = (
  id: number,
  title: string,
  content: string,
  categories: []
) => {
  return {
    type: ADD_POST,
    payload: {
      id,
      title,
      content,
      categories,
    },
  };
};

type ThunkType = ThunkAction<any, any, any, any>;

export const addPost = (
  title: string,
  content: string,
  categories: []
): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      postsApi
        .addPost(title, content, categories)
        .then((response) => {
          if (response.status === 201) {
            dispatch(SetAddPost(response.data.id, title, content, categories));
            dispatch(setStatus("succeeded"));
          }
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
