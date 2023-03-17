import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainPage";
import ComicsPage from "../pages/comicsPage";
import SingleComicPage from "../pages/singleComicPage";
import Page404 from "../pages/page404";


const App = () => {
   
    return (
        <Router >
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={ <MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="/*" element={<Page404/>}/>

                    </Routes>
                </main>
            </div>
        </Router>
    )
}



export default App;