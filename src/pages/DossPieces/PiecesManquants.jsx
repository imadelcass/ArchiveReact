import {
  FormControl,
  IconButton,
  MenuItem,
  NativeSelect,
  Select,
  Tooltip,
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Print } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import img from './20494859.webp';
import JsPDF from 'jspdf';
import usePrint from '../../hooks/usePrint';
import Grid from '../../components/Grid';
import Columns from './columns';
import AxiosConfig from '../../AxiosConfig';

const PiecesManquants = () => {

  const axios = AxiosConfig();
  const dossCompoRef = useRef();
  const pieceCompoRef = useRef();
  const [dossiers, setDossiers] = useState([]);
  const [dossier, setDossier] = useState(dossiers[0]);
  const [typePieces, setTypePieces] = useState([]);

  const [printDoss, setPrintDoss] = useState(false);
  const [printPieces, setPrintPieces] = useState(false);

  const onBeforeGetContent = useCallback(() => {
    setPrintDoss(true);
    return new Promise(resolve => resolve());
  }, []);

  const onAfterPrint = useCallback(() => {
    setPrintDoss(false);
    return new Promise(resolve => resolve());
  }, []);

  const handleDossPrint = useReactToPrint({
    onBeforeGetContent: onBeforeGetContent,
    content: () => dossCompoRef.current,
    onAfterPrint: onAfterPrint,
  });
  const handlePiecePrint = useReactToPrint({
    onBeforeGetContent: () => {
      setPrintPieces(true);
      return new Promise(resolve => resolve());
    },
    content: () => pieceCompoRef.current,
    onAfterPrint: () => {
      setPrintPieces(false);
      return new Promise(resolve => resolve());
    },
  });
  const getNonCompletDoss = async () => {
    try {
      const req = await axios.get('/dossiers', {
        params: { nonCompletDoss: true },
      });
      const res = await req.data;
      setDossiers(() => [...res]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNonCompletDoss();
  }, []);

  return (
    <div className='w-full'>
      {!printPieces && (
        <div ref={dossCompoRef} className={`w-full table $style.page}`}>
          <h1 className='my-8 text-center text-xl '>
            List des dossiers incomplets
          </h1>
          <div className='flex justify-end h-10'>
            {!printDoss && (
              <Tooltip
                onClick={handleDossPrint}
                title='Print'
                placement='top'
                arrow
              >
                <IconButton>
                  <Print color='action' />
                </IconButton>
              </Tooltip>
            )}
          </div>
          {!printDoss && (
            <Grid
              columns={Columns()}
              dossiers={dossiers}
              setDossier={setDossier}
              setTypePieces={setTypePieces}
            />
          )}
          {printDoss && (
            <div
              className={`p-1 flex border-b border-t  w-10/12 m-auto items-center bg-gray-300
              `}
            >
              <div className='flex-1 '>Num</div>
              <div className='flex-1 '>Type</div>
              <div className='flex-1 '>Service</div>
              <div className='flex-1 '>Beneficaire</div>
              <div className='flex-1 '>Annee</div>
            </div>
          )}
          {printDoss &&
            dossiers.map(d => (
              <>
                <div
                  className={`p-1 flex border-b border-gray-300 w-10/12 m-auto items-center`}
                >
                  <div className='flex-1 '>{d.NUMDOSSIER}</div>
                  <div className='flex-1 '>{d.type.codeTypeDoss}</div>
                  <div className='flex-1 '>{d.service.libService}</div>
                  <div className='flex-1 '>
                    {d.beneficiaire.NOMBENEFICIAIRE}
                  </div>
                  <div className='flex-1 '>{d.AnneeDossier}</div>
                </div>
                <div className='page-break' />
              </>
            ))}
        </div>
      )}
      {!printDoss && (
        <div ref={pieceCompoRef} className='w-full table'>
          {printPieces && (
            <div className='flex flex-col pl-6'>
              <div className='mb-4 flex items-center'>
                <label className='pr-4'>N° Dossier : </label>
                <label>{dossier?.NUMDOSSIER}</label>
                {/* <NativeSelect
                  // onChange={(e) => {
                  //   console.log(
                  //     dossiers.filter((d) => d.id == e.target.value)[0]
                  //   );
                  //   setDossier(
                  //     dossiers.filter((d) => d.id == e.target.value)[0]
                  //   );
                  // }}
                >
                  {dossiers.map((e) => {
                    return <option value={e.id}>{e.NUMDOSSIER}</option>;
                  })}
                </NativeSelect> */}
              </div>
              <div>
                <label className='pr-4'>Beneficiaire : </label>
                <label>{dossier?.beneficiaire?.CODEBENEFICIAIRE}</label>
              </div>
            </div>
          )}
          <h1 className='mt-8 text-center text-xl '>
            List des pieces manquants
          </h1>
          <div className='flex justify-end h-10 w-8/12 m-auto'>
            {!printPieces && (
              <Tooltip
                onClick={handlePiecePrint}
                title='Print'
                placement='top'
                arrow
              >
                <IconButton>
                  <Print color='action' />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <div
            className={`p-1 flex border-b border-t  w-8/12 m-auto items-center ${
              !printPieces
                ? 'text-white bg-primer border-primer'
                : 'bg-gray-300'
            }`}
          >
            <div className='flex-1 '>Num</div>
            <div className='flex-1 '>Intitule type</div>
          </div>
          {typePieces.map(p => (
            <div className='p-1 flex border-b border-gray-300 w-8/12 m-auto items-center'>
              <div className='break-all	 flex-1'>{p.codeTypePiece}</div>
              <div className='break-all	 flex-1'>{p.IntituleTypePiece}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PiecesManquants;
