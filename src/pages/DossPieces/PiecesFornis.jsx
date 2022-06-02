import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  NativeSelect,
  Select,
  Tooltip,
} from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Print } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import style from './style.module.scss';
import AxiosConfig from '../../AxiosConfig';

const PiecesFornis = () => {
  const componentRef = useRef();

  const axios = AxiosConfig();
  const [dossiers, setDossiers] = useState([]);
  const [dossier, setDossier] = useState(dossiers[0]);
  const [printIcon, setPrintIcon] = useState(true);

  const getDossiers = async () => {
    try {
      const req = await axios.get('/dossiers');
      const data = await req.data;
      console.log(data);
      setDossiers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onBeforeGetContent = useCallback(() => {
    setPrintIcon(false);
    return new Promise(resolve => resolve());
  }, []);
  const onAfterPrint = useCallback(() => {
    setPrintIcon(true);
    return new Promise(resolve => resolve());
  }, []);
  const handlePrint = useReactToPrint({
    onBeforeGetContent: onBeforeGetContent,
    content: () => componentRef.current,
    onAfterPrint: onAfterPrint,
  });
  useEffect(() => {
    getDossiers();
  }, []);
  // learn useCallback
  return (
    <>
      <div ref={componentRef} className=' w-full table'>
        <div className='w-full h-20'></div>
        <div className='flex flex-col pl-6'>
          <div className='mb-4 flex items-center'>
            <label className='pr-4'>N° Dossier : </label>
            <NativeSelect
              onChange={e => {
                setDossier(dossiers.filter(d => d.id == e.target.value)[0]);
              }}
            >
              <option value={''}></option>
              {dossiers.map(e => {
                return <option value={e.id}>{e.NUMDOSSIER}</option>;
              })}
            </NativeSelect>
          </div>
          <div>
            <label className='pr-4'>Beneficiaire : </label>
            <label>{dossier?.beneficiaire?.CODEBENEFICIAIRE}</label>
          </div>
        </div>
        <h1 className='mt-8 text-center text-xl '>List des pieces fournis</h1>
        <div className='flex justify-end h-10'>
          {printIcon && (
            <Tooltip onClick={handlePrint} title='Print' placement='top' arrow>
              <IconButton>
                <Print color='action' />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div
          className={`p-1 flex border-b border-t  w-8/12 m-auto items-center ${
            printIcon ? 'text-white bg-primer border-primer' : 'bg-gray-300'
          }`}
        >
          <div className='flex-1 '>Num</div>
          <div className='flex-1 '>Type</div>
          <div className='flex-1 '>Intitule</div>
        </div>
        {dossier != undefined &&
          dossier.pieces.map(p => (
            <div className='p-1 flex border-b border-gray-300 w-8/12 m-auto items-center'>
              <div className='break-all	 flex-1'>{p.numPiece}</div>
              <div className='break-all	 flex-1'>{p.type.IntituleTypePiece}</div>
              <div className='break-all	 flex-1'>{p.intitulePiece}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PiecesFornis;
