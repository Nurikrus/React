import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../../store/article/actoin";
import { selectArticle, selectArticleError, selectArticleLoading } from "../../store/article/selectors";

import { Button } from "../Button";

export const News = () => {
    const dispatch = useDispatch();

    const error = useSelector(selectArticleError);
    const loading = useSelector(selectArticleLoading);
    const article = useSelector(selectArticle);

    const reload = () => {
        dispatch(getArticle());
    }

    useEffect(() => {
        reload();
    });

    return (
        <div>
            <h3>Psychonauts</h3>
            {error ? (
                <>
                    <h3>{error}</h3>
                    <Button>{() => (<><span onClick={reload} >Refresh</span></>)}</Button>
                </>
            ) : (
                article.map(art => (
                    <article key={art._id}>
                        <img src={art.img} alt='pic' />
                    </article>
                ))
            )}
            {loading && <CircularProgress />}
        </div>
    )
}