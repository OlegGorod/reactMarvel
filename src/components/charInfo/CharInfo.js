import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'

class CharInfo extends Component {
    state = {
        loading: false,
        error: false,
        char: null
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charId !== this.props.charId) {
            this.updateChar();
        }
    }

    onCharLoading = () => {
        this.setState({ loading: true })
    }

    updateChar = () => {
        const charId = this.props.charId;
        if (!charId) {
            return
        }

        this.onCharLoading();

        this.marvelService.getCharacter(charId)
            .then(res => this.setState({
                char: res,
                loading: false
            }))
        // .catch(this.onErrorMessage())
    }

    onErrorMessage = () => {
        this.setState({ error: true, loading: false })
    }


    render() {
        const { loading, error, char } = this.state
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
}

const View = ({ char }) => {
    const { name, description, thumbnail, comics } = char;
    const filterComics = comics.length ? null : "There are no comics"
    // const limitedComics = comics.length > 8 ? comics.slice(0,8) : comics.slice(0,comics.length)
    const filterImage = thumbnail.match(/available/) ? {'objectFit': 'unset'} : {'objectFit': 'cover'};


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={filterImage}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
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
                {comics.slice(0,5).map((heroes,i) => {
                    
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

