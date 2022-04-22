import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
const baseUrl = process.env.REACT_APP_BASE_URL;

function BenefiSelect({idBenef, setIdBenef}) {
  const [beneficiaires, setBeneficiaires] = useState([]);
  const getBeneficiaires = async () => {
    try {
      const req = await axios.get(`${baseUrl}/beneficieres`);
      const data = await req.data;
      setBeneficiaires(() => data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBeneficiaires();
  }, []);

  return (
    <Select
      value={idBenef}
      className={style.selectOption}
      onChange={(e) => setIdBenef(e.target.value)}
    >
      {beneficiaires.map((b) => {
        return <MenuItem value={b.id}>{b.NOMBENEFICIAIRE}</MenuItem>;
      })}
    </Select>
  );
}

export default BenefiSelect;
