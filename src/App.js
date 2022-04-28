import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Beneficiere from "./pages/Beneficiere";
import Dossiers from "./pages/Dossiers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertMsg from "./components/Alert";
import Rangers from "./pages/Rangers";
import { GlobalProvider } from "./context/GlobalState";
import Pieces from "./pages/Pieces";
import { PiecesFornis } from "./pages/DossPieces";
import { AlertProvider } from "./context/AlertContext";
import PiecesManquants from "./pages/DossPieces/PiecesManquants";

const App = () => {
  return (
    <div className="App">
      <GlobalProvider>
        <AlertProvider>
          <BrowserRouter>
            <Layout>
              <AlertMsg>
                <Routes>
                  {/* <Route path="/" element={<Home />} /> */}
                  <Route path="/" element={<Archive />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/beneficiere" element={<Beneficiere />} />
                  <Route path="/dossiers" element={<Dossiers />} />
                  <Route path="/Rangers" element={<Rangers />} />
                  <Route path="/pieces" element={<Pieces />} />
                  <Route
                    path="/dossiers/pieces-fornis"
                    element={<PiecesFornis />}
                  />
                  <Route
                    path="/dossiers/pieces-manquants"
                    element={<PiecesManquants />}
                  />
                </Routes>
              </AlertMsg>
            </Layout>
          </BrowserRouter>
        </AlertProvider>
      </GlobalProvider>
    </div>
  );
};

export default App;
