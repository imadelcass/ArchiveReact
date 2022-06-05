import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./style.module.scss";
import AxiosConfig from "../../AxiosConfig";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";

function UsersSelect({idUser, setIdUser}) {
  const [users, setUsers] = useState([]);
  const axios = AxiosConfig();
  const getUsers = async () => {
    try {
      const req = await axios.get(`/users`);
      const data = await req.data;
      setUsers(() => data.users);
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
