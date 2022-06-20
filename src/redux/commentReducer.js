import {
  COMMENT_CREATE,
  COMMENT_UPDATE,
  COMMENT_DELETE,
  COMMENTS_LOAD,
} from "./types";

const initialState = {
  comments: [],
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_CREATE:
      return {
        ...state,
        comments: [...state.comments, action.data],
      };

    case COMMENT_UPDATE:
      const { data } = action;
      const { comments } = state;
      const itemIndex = comments.findIndex((res) => res.id === data.id);

      const nextComments = [
        ...comments.slice(0, itemIndex),
        data,
        ...comments.slice(itemIndex + 1),
      ];

      return {
        ...state,
        comments: nextComments,
      };

    case COMMENT_DELETE:
      return (() => {
        const { id } = action;
        const { comments } = state;

        const newArray = comments.filter((el) => el.id !== id);

        return {
          ...state,
          comments: newArray,
        };
      })();

    case COMMENTS_LOAD:
      const commentsNew = action.data.map((el) => {
        return {
          text: el.name,
          id: el.id,
        };
      });
      return {
        ...state,
        comments: commentsNew,
      };

    default:
      return state;
  }
};
