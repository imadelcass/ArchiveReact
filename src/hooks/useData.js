import { useEffect, useState } from 'react';
import AxiosConfig from '../AxiosConfig';

const useData = ({ url }) => {
  const [data, setData] = useState([]);
  const axios = AxiosConfig();

  const getData = async () => {
    try {
      const req = await axios.get(url);
      const res = await req.data;
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  //   const postData = async props => {
  //     console.log(props);
  //     // try {
  //     //   const req = await axios.post(url, data);
  //     //   const res = await req.data;
  //     //   console.log(res);
  //     //   setData(prev => [...prev, res]);
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   };

  useEffect(() => getData(), []);

  return {
    data,
  };
};

export default useData;
