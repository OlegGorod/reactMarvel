import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import { useState } from "react";
import { Helmet } from "react-helmet";


import decoration from '../../resources/img/groot.png';
import CharSearchForm from "../charSearchForm/charSearchForm";

const MainPage = () => {


    const [charId, setCharId] = useState(null)

    const updateCharId = (charId) => {
        setCharId(charId);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar />
            <div className="char__content">
                <CharList updateCharId={updateCharId} charId={charId} />
                <div>
                    <CharInfo charId={charId} />
                    <CharSearchForm />
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="groot" />
        </>
    )
}

export default MainPage