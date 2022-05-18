import axios from 'axios';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Axios = () => {
  const { token } = useContext(GlobalContext);
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });
  instance.defaults.headers.common['Authorization'] = token;
  instance.defaults.headers.post['Content-Type'] = 'application/json';

  return instance;
};
export default Axios;
