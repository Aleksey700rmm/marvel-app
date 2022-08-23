import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, StrictMode } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);  
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;
    
    return (
        <>
            <StrictMode>
                <AppBanner/>
                {errorMessage}
                {spinner}
                {content}
            </StrictMode>
        </>
    )
}

export default SinglePage;