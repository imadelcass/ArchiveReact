import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
const baseUrl = process.env.REACT_APP_BASE_URL;

function UsersSelect({idUser, setIdUser}) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const req = await axios.get(`${baseUrl}/users`);
      const data = await req.data;
      setUsers(() => data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Select
      value={idUser}
      className={style.selectOption}
      onChange={(e) => setIdUser(e.target.value)}
    >
      {users.map((b) => {
        return <MenuItem value={b.id}>{b.name}</MenuItem>;
      })}
    </Select>
  );
}

export default UsersSelect;
