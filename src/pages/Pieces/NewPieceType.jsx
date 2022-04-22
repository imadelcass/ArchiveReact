import { Close } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import style from "./style.module.scss";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

const addNewPieceType = async (obj, typePieces, setTypePieces) => {
  try {
    const req = await axios.post("/typepiece/add", obj);
    const data = await req.data;
    if (data.success) {
      setTypePieces((prev) => [...prev, data.typePiece]);
    }
  } catch (error) {
    console.log(error);
  }
};

const NewPieceType = () => {
  const { typePieces, setTypePieces } = useContext(GlobalContext);
  const [code, setCode] = useState("");
  const [intitule, setIntitule] = useState("");
  return (
    <div className="w-6/12 flex items-center">
      <div className="w-36 mr-1">
        <label>Code</label>
        <input
          className="w-full h-6 border border-gray-300 rounded outline-none p-2"
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
      </div>
      <div className="w-40 ml-1">
        <label>Intitule</label>
        <div className="flex items-center">
          <input
            className="w-36 h-6 border border-gray-300 rounded outline-none p-2"
            type="text"
            onChange={(e) => setIntitule(e.target.value)}
            value={intitule}
          />
          <div className="w-2 ml-1">
            <AddCircleOutlineRoundedIcon
              onClick={() =>
                addNewPieceType({ code, intitule }, typePieces, setTypePieces)
              }
              className="cursor-pointer text-gray-400 hover:text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPieceType;
