import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
const baseUrl = process.env.REACT_APP_BASE_URL;

function ServicesSelect({idService, setIdService}) {
  const [services, setServices] = useState([]);
  const getServices = async () => {
    try {
      const req = await axios.get(`${baseUrl}/service`);
      const data = await req.data;
      console.log(data);
      setServices(() => data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  return (
    <Select
      value={idService}
      className={style.selectOption}
      onChange={(e) => setIdService(e.target.value)}
    >
      {services.map((s) => {
        return <MenuItem value={s.id}>{s.codeService}</MenuItem>;
      })}
    </Select>
  );
}

export default ServicesSelect;
