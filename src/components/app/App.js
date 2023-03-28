import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainPage";
import ComicsPage from "../pages/comicsPage";
import SingleComicPage from "../pages/singleComicPage";
import Page404 from "../pages/page404";
import SingleCharacter from "../pages/singleCharacter";
import SinglePage from "../pages/singlePage";


const App = () => {

    return (
        <Router >
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route
                            path="/comics/:comicId"
                            element={<SinglePage Component={SingleComicPage} dataType='comic' />} />
                        <Route
                            path="/characters/:comicId"
                            element={<SinglePage Component={SingleCharacter} dataType='character' />} />
                        <Route path="/*" element={<Page404 />} />

                    </Routes>
                </main>
            </div>
        </Router>
    )
}



export default App;