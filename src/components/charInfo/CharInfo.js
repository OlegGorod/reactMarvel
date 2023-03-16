import './charInfo.scss';
import { Component, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'

const CharInfo = (props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [char, setChar] = useState(null)


    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const onCharLoading = () => {
        setLoading(true)
    }

   const updateChar = () => {
        const charId = props.charId;
        if (!charId) {
            return
        }

        onCharLoading();

        marvelService.getCharacter(charId)
            .then(res => {
                setChar(res)
                setLoading(false)
            })
        // .catch(this.onErrorMessage())
    }

    const onErrorMessage = () => {
        setError(true);
        setLoading(false)
    }

    const skeleton = loading || error || char ? null : <Skeleton />
    const spinner = loading ? <Spinner /> : null
    const problem = error ? <ErrorMessage /> : null
    const content = spinner || problem || !char ? null : <View char={char} />


    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {problem}
            {content}


        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, comics, wiki } = char;
    const filterComics = comics.length ? null : "There are no comics"
    const filterImage = thumbnail.match(/available/) ? { 'objectFit': 'unset' } : { 'objectFit': 'cover' };

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={filterImage} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={wiki} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {filterComics}
                {comics.slice(0, 5).map((heroes, i) => {

                    return (
                        <li className="char__comics-item" key={i}>
                            {heroes.name}
                        </li>
                    )
                })}

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;

