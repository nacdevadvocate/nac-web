import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { HomePage, LocationRetrieval, LocationVerification } from "./pages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import QoDPage from "./pages/QoDPage";
import SimSwapPage from "./pages/SimSwapPage";
import Terms from "./components/Terms/Terms";
import { useSessionStorage } from "./hooks/useSessionStorage";


function App() {
    const [value, setValue] = useSessionStorage('tab',);

    const handleAccept = () => {
        setValue(1);
    };


    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/location-verification" element={<LocationVerification />} />
                    <Route path="/location-retrieval" element={<LocationRetrieval />} />
                    <Route path="/qod" element={<QoDPage />} />
                    <Route path="/sim-swap" element={<SimSwapPage />} />
                </Routes>
                <Toaster />
                {!value && <Terms onAccept={handleAccept} />}
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App
