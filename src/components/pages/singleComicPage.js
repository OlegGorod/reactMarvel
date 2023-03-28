import './singleComicPage.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = ({data}) => {
    const { title, description, pageCount, thumbnail, language, price } = data;


    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
                <Link to={'/comics'}><button className="single-comic__back button__long">Back to comics</button>
                </Link>
                <Link to={'/'}><button
                    className="single-comic__back button__long"
                    style={{ 'marginLeft': '15px' }}>Back to characters</button></Link>
            </div>
        </div>
    )
}


export default SingleComicPage;