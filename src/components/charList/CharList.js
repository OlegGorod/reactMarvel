import './charList.scss';
import MarvelService from '../../services/MarvelService';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
 
    state = {
        arrayOfChar: [],
        error: false,
        loading: true,
        offset: 9,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(this.state.offset);
    }

    onRequest = (newOffset) => {
        this.marvelService.getAllCharacters(newOffset)
        .then(this.showCharacters)
        .catch(this.onError)
    }

    showCharacters = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState({
            arrayOfChar: [...this.state.arrayOfChar, ...newCharList],
            loading: false,
            offset: this.state.offset + 9,
            charEnded: ended
        })
    }

    onError = () => {
        this.setState({ error: true, loading: false })
    }

    showMarvels (arrayOfChar) {
        return arrayOfChar.map((heroes) => {
            const { thumbnail, name, id } = heroes
            const active = this.props.charId === id;
            const style = active ? "char__item char__item_selected" : "char__item"
            const filterImage = (image) => {
                return image.match(/available/) ? { objectFit: "unset" } : { objectFit: "cover" }
            }
            return (
                    <li className={style} key={id} onClick={() => this.props.updateCharId(id)} >
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

    render() {
        const { arrayOfChar, error, loading, offset, charEnded } = this.state;
        const marvels = this.showMarvels(arrayOfChar)
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
                    style={{display: charEnded ? 'none' : 'block'}}
                     onClick={() => this.onRequest(offset)}>
                        <div className="inner">load more</div>
                    </button>
                </div>
            </Fragment>
        )
    }
}

CharList.propTypes = {
    updateCharId: PropTypes.func.isRequired,
    charId: PropTypes.number
}

export default CharList;

