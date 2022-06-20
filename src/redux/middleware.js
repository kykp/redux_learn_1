import { COMMENT_CREATE } from "./types";
import { errorOn } from "./actions";

const badWords = ["козел", "осел"];

export function spamFilter({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === COMMENT_CREATE) {
        const bad = badWords.some((it) => action.data.text.includes(it));
        if (bad) {
          return dispatch(errorOn("Уважайте всех"));
        }
      }
      return next(action);
    };
  };
}
