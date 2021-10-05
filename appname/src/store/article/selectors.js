import { REQUEST_STATUS } from "../../utils/constants";

export const selectArticleLoading = (state) =>
    state.article.request.status === REQUEST_STATUS.PENDING;
export const selectArticle = (state) => state.article.list;
export const selectArticleError = (state) => state.article.request.error;

