import AxiosConfig from '../../AxiosConfig';
import { useContext, useState } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';

const Login = () => {
  const [name, setName] = useState('user');
  const [password, setPassword] = useState('1234');
  const { setToken, setUser, setAuth } = useContext(GlobalContext);
  const navigate = useNavigate();
  const axios = AxiosConfig();
  const login = () => {
    try {
      axios
        .get('http://127.0.0.1:8000/sanctum/csrf-cookie')
        .then(async response => {
          const req = await axios.post('/login', {
            name,
            password,
          });
          const res = await req.data;
          console.log(res);
          setUser(res.user);
          setAuth(true);
          setToken(`Bearer ${res.token}`);
          if (res.success) {
            navigate('/');
          }
        });
    } catch (error) {
      console.log('login', error);
    }
  };
  return (
    <div className={style.login}>
      <div className={style.loginForm}>
        <h1>Logo</h1>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Username'
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
