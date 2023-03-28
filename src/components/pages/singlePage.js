import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({ Component, dataType }) => {
    const { comicId } = useParams();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState('')

    const marvelService = new MarvelService();

    useEffect(() => {
        updateData()
        onCharLoading();
    }, [comicId])

    const onCharLoading = () => {
        setLoading(true)
    }

    const updateData = () => {
        switch (dataType) {
            case 'comic':
                marvelService.getComic(comicId)
                    .then(res => {
                        onDataLoaded(res);
                        setLoading(false)
                    })
                    .catch(() => setError(true))
                break;
            case 'character':
                marvelService.getCharacter(comicId)
                    .then(res => {
                        onDataLoaded(res)
                        setLoading(false)
                    })
                    .catch(() => setError(true))
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    const problem = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null

    return (
        <>
            <AppBanner />
            {problem}
            {spinner}
            {content}

        </>
    )



}


export default SinglePage