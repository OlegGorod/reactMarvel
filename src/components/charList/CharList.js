import './charList.scss';
import MarvelService from '../../services/MarvelService';
import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {

    const [arrayOfChar, setArrayOfChar] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(9);
    const [charEnded, setCharEnded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0)

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest(offset);
    }, []);

    const onRequest = (newOffset) => {
        marvelService.getAllCharacters(newOffset)
            .then(showCharacters)
            .catch(onError)
    }

    const showCharacters = (newCharList) => {
        let ended = false;
        if (newCharList.length < 1) {
            ended = true;
        }
        setScrollPosition(window.pageYOffset)
        setArrayOfChar(arrayOfChar => [...arrayOfChar, ...newCharList])
        setLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const showMarvels = (arrayOfChar) => {
        return arrayOfChar.map((heroes, i) => {
            const { thumbnail, name, id } = heroes
            const active = props.charId === id;
            const style = active ? "char__item char__item_selected" : "char__item"
            const filterImage = (image) => {
                return image.match(/available/) ? { objectFit: "unset" } : { objectFit: "cover" }
            }
            return (
                <li className={style} key={i} onClick={() => props.updateCharId(id)} >
                    <img
                        src={thumbnail}
                        alt={name}
                        style={filterImage(thumbnail)}
                    />
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    }

    const marvels = showMarvels(arrayOfChar)
    const problem = error ? <ErrorMessage /> : null
    const inProcess = loading ? <Spinner /> : null
    const progress = problem || inProcess || marvels;
    



    return (
        <Fragment>
            <div className="char__list">
                <ul className="char__grid">
                    {progress}
                </ul>
                <button
                    className="button button__main button__long"
                    style={{ display: charEnded ? 'none' : 'block' }}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        </Fragment>
    )
}

CharList.propTypes = {
    updateCharId: PropTypes.func.isRequired,
    charId: PropTypes.number
}

export default CharList;

