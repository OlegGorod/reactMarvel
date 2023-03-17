import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import MarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [arrayOfComics, setArrayOfComics] = useState([])
    const [offset, setOffset] = useState(210);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        onRequest()
    }, [])

    const marvelService = new MarvelService();

    const onRequest = (offset) => {
        marvelService.getComicsList(offset)
            .then(showComics)
            .catch(onError)
    }

    const showComics = (comicsList) => {
        setArrayOfComics([...arrayOfComics, ...comicsList])
        setLoading(false);
        setOffset(offset => offset + 8)
    }

    const onError = () => {
        setError(true);
    }

    function content(arr) {
       const items = arr.map((list, i) => {
            const { description, id, thumbnail, title, price } = list;
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const spinner = loading ? <Spinner /> : null;
    const problem = error ? <ErrorMessage /> : null;
    const render = problem || spinner || content(arrayOfComics);

    return (
        <div className="comics__list">
            {render}
            <button className="button button__main button__long" onClick={() => onRequest(offset)} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;