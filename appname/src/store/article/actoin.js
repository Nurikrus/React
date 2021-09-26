import { public_url } from "../../utils/constants";

export const GET_ARTICLE_PENDING = 'ARTICLE::GET_PENDING';
export const GET_ARTICLE_SUCCESS = 'ARTICLE::GET_SUCCESS';
export const GET_ARTICLE_FAILURE = 'ARTICLE::GET_FAILURE';

const getArticlePending = () => ({
    type: GET_ARTICLE_PENDING,
});

const getArticleSuccess = (article) => ({
    type: GET_ARTICLE_SUCCESS,
    payload: article,
});

const getArticleFailure = (error) => ({
    type: GET_ARTICLE_FAILURE,
    payload: error,
});

export const getArticle = () => (dispatch) => {
    dispatch(getArticlePending());

    fetch(public_url).then((response) => {
        if (!response.ok) {
            throw new Error(`error ${response.status}`);
        };
        return response.json();
    }).then((result) => {
        dispatch(getArticleSuccess(result));
    }).catch((e) => {
        dispatch(getArticleFailure(e.message));
    });
}
