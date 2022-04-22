import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
const baseUrl = process.env.REACT_APP_BASE_URL;

function TypeDossSelect({ idTypeDoss, setIdTypeDoss }) {
  const [typedossiers, setTypedossiers] = useState([]);
  const getTypeDossiers = async () => {
    try {
      const req = await axios.get(`${baseUrl}/typedossiers`);
      const data = await req.data;
      setTypedossiers(() => data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTypeDossiers();
  }, []);
  return (
    <Select
      value={idTypeDoss}
      className={style.selectOption}
      onChange={(e) => setIdTypeDoss(e.target.value)}
    >
      {typedossiers.map((t) => {
        return <MenuItem value={t.id}>{t.libTypeDoss}</MenuItem>;
      })}
    </Select>
  );
}

export default TypeDossSelect;
