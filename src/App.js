import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Beneficiere from './pages/Beneficiere';
import Dossiers from './pages/Dossiers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlertMsg from './components/Alert';
import Rangers from './pages/Rangers';
import { GlobalContext, GlobalProvider } from './context/GlobalState';
import Pieces from './pages/Pieces';
import { PiecesFornis } from './pages/DossPieces';
import { AlertProvider } from './context/AlertContext';
import PiecesManquants from './pages/DossPieces/PiecesManquants';
import Users from './pages/Users';
import Login from './pages/Login';
import { useContext } from 'react';

const App = () => {
  const { user } = useContext(GlobalContext);
  return (
    <div className='App'>
      <GlobalProvider>
        <AlertProvider>
          <BrowserRouter>
            <Layout>
              <AlertMsg>
                <Routes>
                  {user != {} ? (
                    <>
                      <Route path='/' element={<Archive />} />
                      <Route path='/archive' element={<Archive />} />
                      <Route path='/beneficiere' element={<Beneficiere />} />
                      <Route path='/dossiers' element={<Dossiers />} />
                      <Route path='/Rangers' element={<Rangers />} />
                      <Route path='/pieces' element={<Pieces />} />
                      {user?.isAdmin && (
                        <Route path='/utilisateurs' element={<Users />} />
                      )}
                      <Route
                        path='/dossiers/pieces-fornis'
                        element={<PiecesFornis />}
                      />
                      <Route
                        path='/dossiers/pieces-manquants'
                        element={<PiecesManquants />}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <Route path='/login' element={<Login />} />
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
