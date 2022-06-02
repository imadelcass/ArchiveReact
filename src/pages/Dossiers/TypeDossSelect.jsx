import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import AxiosConfig from '../../AxiosConfig';
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";

function TypeDossSelect({ idTypeDoss, setIdTypeDoss }) {
  const axios = AxiosConfig();
  const [typedossiers, setTypedossiers] = useState([]);
  const getTypeDossiers = async () => {
    try {
      const req = await axios.get(`/typedossiers`);
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
