import AxiosConfig from '../AxiosConfig';
import { createContext, useEffect, useState } from 'react';

const initialState = {
  refTypeDoss: {},
  refServices: {},
  refBenefs: {},
  refCellules: {},
  refUsers: {},
  pieces: [],
  typePieces: [],
  dossiers: [],
};
export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [refTypeDoss, setRefTypeDoss] = useState({});
  const [refServices, setRefServices] = useState({});
  const [refBenefs, setRefBenefs] = useState({});
  const [refCellules, setRefCellules] = useState({});
  const [refUsers, setRefUsers] = useState({});
  const [pieces, setPieces] = useState([]);
  const [typePieces, setTypePieces] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [refDossiers, setRefDossiers] = useState([]);
  const [refPieceTypes, setRefPieceTypes] = useState([]);
  const [token, setToken] = useState('');
  const [pdf, setPdf] = useState('');
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const axios = AxiosConfig();
  // Actions for changing state
  const getTypeDossiers = async () => {
    try {
      const req = await axios.get(`/typedossiers`);
      const data = await req.data;
      //   setTypedossiers(() => data);
      setRefTypeDoss(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.libTypeDoss;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getServices = async () => {
    try {
      const req = await axios.get(`/service`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer 6|pD2hco13fWfQFDkoRmCNnM5yi1Lspoen46VyVDOC',
        },
      });
      const data = await req.data;
      setRefServices(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.libService;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getBeneficiaires = async () => {
    try {
      const req = await axios.get(`/beneficieres`);
      const data = await req.data;
      setRefBenefs(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.NOMBENEFICIAIRE;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCellules = async () => {
    try {
      const req = await axios.get(`/cellules`);
      const data = await req.data;
      setRefCellules(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.codeCellule;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const req = await axios.get(`/users`);
      const data = await req.data;
      setRefUsers(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.name;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getPieces = async () => {
    try {
      const req = await axios.get(`/pieces`);
      const data = await req.data;
      setPieces(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTypePieces = async () => {
    try {
      const req = await axios.get('/typepieces');
      const data = await req.data;
      setTypePieces(data);
      setRefPieceTypes(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.IntituleTypePiece;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDossiers = async () => {
    try {
      const req = await axios.get('/dossiers', {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer 4|rXY4aftc2iVkzZKZ7hdThzPdDMXSfu9wckArqNa0',
        },
      });
      const data = await req.data;
      setDossiers(data);
      setRefDossiers(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.NUMDOSSIER;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTypeDossiers();
    getServices();
    getBeneficiaires();
    getCellules();
    getUsers();
    getTypePieces();
    getDossiers();
    getPieces();
  }, []);
  //   function addItemToList(item) {
  //     dispatch({
  //       type: "ADD_ITEM",
  //       payload: item,
  //     });
  //   }

  return (
    <GlobalContext.Provider
      value={{
        refTypeDoss,
        refServices,
        refBenefs,
        refCellules,
        refUsers,
        pieces,
        typePieces,
        setTypePieces,
        dossiers,
        refDossiers,
        refPieceTypes,
        pdf,
        setPdf,
        token,
        setToken,
        user,
        setUser,
        auth,
        setAuth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
