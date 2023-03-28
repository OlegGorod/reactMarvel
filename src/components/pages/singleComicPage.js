import './singleComicPage.scss';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const SingleComicPage = ({ data }) => {
    const { title, description, pageCount, thumbnail, language, price } = data;


    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
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