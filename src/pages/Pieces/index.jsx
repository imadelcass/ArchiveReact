import style from "./style.module.scss";
import Header from "../../components/Header";
import NewPage from "./NewPage";
import PieceGrid from "./PieceGrid";
import { GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";
import DisplayFile from "./DisplayFile";

const Pieces = () => {
  const { pieces } = useContext(GlobalContext);
  return (
    <div className={style.pieces}>
      <Header title="Pieces" />
      <div className={style.container}>
        <PieceGrid pieces={pieces} />
        {/* <NewPage pieces={pieces} /> */}
        <DisplayFile />
      </div>
    </div>
  );
};

export default Pieces;
