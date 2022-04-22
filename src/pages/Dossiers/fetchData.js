import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = process.env.REACT_APP_BASE_URL;

// const Date = () => {

// };
const Cellules = () => {
  const [cellules, setCellules] = useState([]);
  const getCellules = async () => {
    try {
      const req = await axios.get(`${baseUrl}/cellules`);
      const data = await req.data;
      setCellules(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCellules();
  }, []);
  return cellules;
};
const Beneficiaires = () => {
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
  return beneficiaires;
};
const Services = () => {
  const [services, setServices] = useState([]);
  const getServices = async () => {
    try {
      const req = await axios.get(`${baseUrl}/sevice`);
      const data = await req.data;
      setServices(() => data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  return services;
};
const Typedossiers = () => {
  const [typedossiers, setTypedossiers] = useState([]);
  const [refTypeDoss, setRefTypeDoss] = useState({});

  const getTypeDossiers = async () => {
    try {
      const req = await axios.get(`${baseUrl}/typedossiers`);
      const data = await req.data;
      setTypedossiers(() => data);
      // setRefTypeDoss(() => {
      //   let obj = {};
      //   data.map((e) => {
      //     obj[e.id] = e.libTypeDoss;
      //   });
      //   return obj;
      // });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTypeDossiers();
  }, []);
  return typedossiers;
};

export { Typedossiers, Services, Beneficiaires, Cellules };
