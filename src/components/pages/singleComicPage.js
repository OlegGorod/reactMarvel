import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComicPage = () => {
    const { comicId } = useParams();
   

    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest(comicId)
    }, [])

    const onRequest = (comicId) => {
        setLoading(false)
        marvelService.getComic(comicId)
            .then(setComic)
            .catch(() => setError(true));
    }


    const problem = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null


    return (
        <>
            {problem}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {id, title, description, pageCount, thumbnail, language, price} = comic;
    const navigate = useNavigate();

    
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <div onClick={() => navigate(-1)} className="single-comic__back">Back to comics</div>
        </div>
    )
}

export default SingleComicPage;