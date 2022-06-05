import { Close } from '@mui/icons-material';
import { MenuItem, Select, Tooltip } from '@mui/material';
import style from './style.module.scss';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import NewPieceType from './NewPieceType';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { AlertContext } from '../../context/AlertContext';
import AxiosConfig from '../../AxiosConfig';

const NewPiece = ({ display, setDisplay, gridRef }) => {
  const axios = AxiosConfig();
  const [dossiers, setDossiers] = useState([]);
  const [typePieces, setTypePieces] = useState([]);
  const { setAlert } = useContext(AlertContext);
  const [displayNewType, setDisplayNewType] = useState(false);
  const [idTypePiece, setIdTypePiece] = useState(null);
  const [num, setNum] = useState('');
  const [intitule, setIntitule] = useState('');
  const [idDossier, setIdDossier] = useState(null);
  const [file, setFile] = useState(undefined);
  const getDossiers = async () => {
    try {
      const req = await axios.get('/dossiers');
      const data = await req.data;
      setDossiers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTypePieces = async () => {
    try {
      const req = await axios.get('/typepieces');
      const data = await req.data;
      setTypePieces(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTypePieces();
    getDossiers();
  }, []);

  const addNewPiece = async piece => {
    const formData = new FormData();
    piece.map(e => formData.append(e.name, e.value));
    try {
      const req = await axios.post('/piece/add', formData);
      const data = await req.data;
      console.log(data);
      setDisplay(false);
      // execute alert
      //execute alert
      setAlert(() => {
        return {
          state: true,
          text: data.msg,
          severity: data.severity,
        };
      });
      if (data.success) {
        gridRef.current.api.applyTransaction({ add: [data.piece] });
        // gridRef.current.api.refreshCells({ force: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const piece = [
    { name: 'idTypePiece', value: idTypePiece },
    { name: 'idDossier', value: idDossier },
    { name: 'num', value: num },
    { name: 'intitule', value: intitule },
    { name: 'file', value: file?.file },
  ];
  const onFileChange = e => {
    setFile({
      file: e.target.files[0],
      display: URL.createObjectURL(e.target.files[0]),
    });
  };
  return (
    <div className='w-full h-full bg-primer fixed top-0 left-0 z-10'>
      <div className={style.newPiece}>
        <div className={style.modelHeader}>
          <div className={style.modelTitle}>Ajouter une piece</div>
          <Tooltip title='Close' placement='bottom' arrow>
            <Close
              className={style.closeBtnInner}
              onClick={() => setDisplay(false)}
            />
          </Tooltip>
        </div>
        <div className={style.modelWrapper}>
          <div className={style.fields}>
            <div className={style.field}>
              <label>Numéro</label>
              <input
                type='text'
                onChange={e => setNum(e.target.value)}
                value={num}
              />
            </div>
            <div className={style.field}>
              <label>Intitule</label>
              <input
                type='text'
                onChange={e => setIntitule(e.target.value)}
                value={intitule}
              />
            </div>
          </div>
          <div className={style.fields}>
            <div className={style.field}>
              <div className='flex justify-between items-center'>
                <label>Type</label>
                {displayNewType ? (
                  <RemoveCircleOutlineRoundedIcon
                    className='cursor-pointer text-gray-400 hover:text-gray-900'
                    onClick={() => setDisplayNewType(false)}
                  />
                ) : (
                  <AddCircleOutlineRoundedIcon
                    className='cursor-pointer text-gray-400 hover:text-gray-900'
                    onClick={() => setDisplayNewType(true)}
                  />
                )}
              </div>
              <Select
                className={style.input}
                value={idTypePiece}
                onChange={e => setIdTypePiece(e.target.value)}
              >
                {typePieces.map(e => {
                  return (
                    <MenuItem value={e.id}>{e.IntituleTypePiece}</MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={style.field}>
              <label>Dossier</label>
              <Select
                className={style.input}
                value={idDossier}
                onChange={e => setIdDossier(e.target.value)}
              >
                {dossiers.map(e => {
                  return <MenuItem value={e.id}>{e.NUMDOSSIER}</MenuItem>;
                })}
              </Select>
            </div>
          </div>
          <div className={style.fields}>
            <div className={style.field}>
              {displayNewType && <NewPieceType />}
            </div>
          </div>
          <div className='h-[94px]'>
            <label className=''>Fichier</label>
            <input
              type='file'
              hidden
              id='page_photo'
              onChange={e => onFileChange(e)}
            />
            <label className='cursor-pointer' htmlFor='page_photo'>
              <div className='border border-dashed border-2 border-gray-600 h-[55px] flex items-center justify-center mt-1'>
                <CloudUploadOutlinedIcon className='' />
              </div>
            </label>
          </div>

          <div className={style.modelBtns}>
            <button onClick={() => addNewPiece(piece)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPiece;
