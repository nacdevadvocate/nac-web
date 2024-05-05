import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, LocationRetrieval, LocationVerification } from "./pages";
import Header from "./components/Header/Header";


function App() {


    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/location-verification" element={<LocationVerification />} />
                    <Route path="/location-retrieval" element={<LocationRetrieval />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

export default App
