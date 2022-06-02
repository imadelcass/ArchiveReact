import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import AxiosConfig from "../../AxiosConfig";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";

function ServicesSelect({idService, setIdService}) {
  const [services, setServices] = useState([]);
  const axios = AxiosConfig();
  const getServices = async () => {
    try {
      const req = await axios.get(`/service`);
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
