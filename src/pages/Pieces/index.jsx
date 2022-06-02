import style from './style.module.scss';
import Header from '../../components/Header';
import NewPage from './NewPage';
import PieceGrid from './PieceGrid';
import { GlobalContext } from '../../context/GlobalState';
import { useContext, useEffect, useState } from 'react';
import DisplayFile from './DisplayFile';
import AxiosConfig from '../../AxiosConfig';

const Pieces = () => {
  const axios = AxiosConfig();
  const [pieces, setPieces] = useState([]);
  const getPieces = async () => {
    try {
      const req = await axios.get(`/pieces`);
      const data = await req.data;
      setPieces(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getPieces(), []);
  return (
    <div className={style.pieces}>
      <Header title='Pieces' />
      <div className={style.container}>
        <PieceGrid pieces={pieces} />
        {/* <NewPage pieces={pieces} /> */}
        <DisplayFile />
      </div>
    </div>
  );
};

export default Pieces;
