import { AgGridReact } from 'ag-grid-react';
import { useContext, useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import { Add, Close, Print } from '@mui/icons-material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CellulesSelect from './CellulesSelect';
import ServicesSelect from './ServicesSelect';
import TypeDossSelect from './TypeDossSelect';
import BenefiSelect from './BenefiSelect';
import axios from 'axios';
import UsersSelect from './UsersSelect';
import { AlertContext } from '../../context/AlertContext';
import ActionCell from './ActionCell';
import { refTypeDoss } from './fetchData';
import { GlobalContext } from '../../context/GlobalState';
import NewTypeDoss from './NewTypeDoss';
import Header from '../../components/Header';

function Dossiers() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const gridRef = useRef();
  const [dossiers, setDossiers] = useState([]);
  const [dossValid, setDossValid] = useState(false);
  const [display, setDisplay] = useState(false);
  const [numDoss, setNumDoss] = useState('');
  const [typeDoss, setTypeDoss] = useState('');
  const [serviceDoss, setServiceDoss] = useState('');
  const [beneficiaire, setBeneficiaire] = useState('');
  const [dateDoss, setDateDoss] = useState('');
  const [dateEditDoss, setDateEditDoss] = useState('');
  const [celluleDoss, setCelluleDoss] = useState('');
  const [anneeDoss, setAnneeDoss] = useState('');
  const [objetDoss, setObjetDoss] = useState('');
  const [dispoDoss, setDispoDoss] = useState(false);
  const [validDoss, setValidDoss] = useState(false);
  const [validPar, setValidPar] = useState('');
  const [idBenef, setIdBenef] = useState(1);
  const [idUser, setIdUser] = useState(null);
  const [idService, setIdService] = useState(1);
  const [idTypeDoss, setIdTypeDoss] = useState(1);
  const [cellule, setCellule] = useState('');
  const [displayNewTypeDoss, setDisplayNewTypeDoss] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const { refTypeDoss, refServices, refBenefs, refCellules, refUsers } =
    useContext(GlobalContext);

  const extractValues = mappings => {
    return Object.keys(mappings);
  };
  const columnDefs = [
    {
      field: 'NUMDOSSIER',
      headerName: 'Num',
    },
    {
      field: 'IDTYPEDOSSIER',
      headerName: 'Type',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refTypeDoss),
      },
      refData: refTypeDoss,
    },
    {
      field: 'IDSERVICE',
      headerName: 'Service',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refServices),
      },
      refData: refServices,
    },
    {
      field: 'IDBENEFICIAIRE',
      headerName: 'Beneficiaire',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refBenefs),
      },
      refData: refBenefs,
    },
    {
      field: 'DATEDOSSIER',
      headerName: 'Date',
    },
    {
      field: 'idCellule',
      headerName: 'Cellule',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refCellules),
      },
      refData: refCellules,
    },
    {
      field: 'AnneeDossier',
      headerName: 'Annee',
    },
    {
      field: 'ObjetDossier',
      headerName: 'Objet',
    },
    {
      field: 'DISPODOSSIER',
      headerName: 'Disponible',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [0, 1],
      },
      refData: {
        0: 'none',
        1: 'oui',
      },
    },
    {
      field: 'VALID',
      headerName: 'Valider',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [0, 1],
      },
      refData: {
        0: 'none',
        1: 'oui',
      },
    },
    {
      field: 'VALIDPAR',
      headerName: 'Valider Par',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refUsers),
      },
      refData: refUsers,
    },
    {
      headerName: 'Action',
      editable: false,
      filter: false,
      headerClass: 'actionHeaderCol',
      cellRenderer: props => (
        <ActionCell
          props={props}
          gridRef={gridRef}
          dateEditDoss={dateEditDoss}
        />
      ),
    },
  ];
  const defaultColDef = {
    editable: true,
    flex: 1,
    sortable: true,
    filter: true,
  };
  const dossier = {
    dossValid,
    numDoss,
    dateDoss,
    anneeDoss,
    objetDoss,
    dispoDoss,
    validPar,
    idBenef,
    idService,
    idTypeDoss,
    idUser,
    idCellule: cellule.id,
  };
  const getDossiers = async () => {
    try {
      const req = await axios.get('/dossiers', {
        headers: {
          // accept: 'application/json',
          Authorization: 'Bearer 9|1MZhyvhRvpBIJkzjdEKL7SNgsN18fjpCFrQ1gaV7',
        },
      });
      const data = await req.data;
      console.log(data);
      setDossiers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const addNewDossier = async () => {
    try {
      console.log(dossier);
      const req = await axios.post(`${baseUrl}/dossier/add`, dossier);
      const data = await req.data;
      console.log(data);
      if (data.success) {
        setDisplay(false);
        setAlert(() => {
          return {
            state: true,
            text: data.msg,
            severity: data.severity,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDossiers();
  }, []);

  return (
    <div>
      <Header title='Dossiers' />
      <div className='flex justify-end mb-2'>
        <button
          className='mr-10 text-base underline'
          onClick={() => setDisplayNewTypeDoss(true)}
        >
          Add new type
        </button>
        <Tooltip title='add new' placement='top' arrow>
          <IconButton>
            <Add color='action' onClick={() => setDisplay(true)} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Print' placement='top' arrow>
          <IconButton>
            <Print color='action' />
          </IconButton>
        </Tooltip>
      </div>
      <div className='ag-theme-material h-96'>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={dossiers}
          defaultColDef={defaultColDef}
          rowSelection='single'
          editType='fullRow'
          getRowNodeId={data => data.id}
          suppressClickEdit
          // stopEditingWhenCellsLoseFocus
        />
      </div>
      {display && (
        <div className='w-full h-full bg-primer fixed top-0 left-0'>
          <div className={style.newDossier}>
            <div className={style.modelHeader}>
              <div className={style.modelTitle}>Add new Dossier</div>
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
                  <label>Numero</label>
                  <input
                    type='text'
                    onChange={e => setNumDoss(e.target.value)}
                    value={numDoss}
                  />
                </div>
                <div className={style.field}>
                  <label>Type</label>
                  <TypeDossSelect
                    idTypeDoss={idTypeDoss}
                    setIdTypeDoss={setIdTypeDoss}
                  />
                </div>
                <div className={style.field}>
                  <label>Service</label>
                  <ServicesSelect
                    idService={idService}
                    setIdService={setIdService}
                  />
                </div>
              </div>
              <div className={style.fields}>
                <div className={style.field}>
                  <label>Beneficiaire</label>
                  <BenefiSelect idBenef={idBenef} setIdBenef={setIdBenef} />
                </div>
                <div className={style.field}>
                  <label>Date</label>
                  <input
                    type='date'
                    onChange={e => setDateDoss(e.target.value)}
                    value={dateDoss}
                  />
                </div>
                <div className={style.field}>
                  <label>Cellule</label>
                  <CellulesSelect cellule={cellule} setCellule={setCellule} />
                </div>
              </div>
              <div className={style.fields}>
                <div className={style.field}>
                  <label>Annee</label>
                  <input
                    type='text'
                    onChange={e => setAnneeDoss(e.target.value)}
                    value={anneeDoss}
                  />
                </div>
                <div className={style.field}>
                  <label>Objet</label>
                  <input
                    type='text'
                    onChange={e => setObjetDoss(e.target.value)}
                    value={objetDoss}
                  />
                </div>
                <div className={style.field}>
                  <div className={style.fieldf}>
                    <label>Disponible</label>
                    <Checkbox
                      sx={{
                        border: 1,
                        borderColor: dispoDoss ? 'blue-sky' : 'gray',
                        borderRadius: 1,
                        p: 2,
                        minWidth: 300,
                        height: 55,
                      }}
                      icon={<CheckCircleOutlineRoundedIcon fontSize='large' />}
                      checkedIcon={<CheckCircleRoundedIcon fontSize='large' />}
                      checked={dispoDoss}
                      onChange={e => setDispoDoss(e.target.checked)}
                      // inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                </div>
              </div>
              <div className={style.fields}>
                <div style={{ margin: '10px 0' }}>
                  <label>Valider</label>
                  <Checkbox
                    icon={<CheckCircleOutlineRoundedIcon fontSize='large' />}
                    checkedIcon={<CheckCircleRoundedIcon fontSize='large' />}
                    checked={dossValid}
                    onChange={e => setDossValid(e.target.checked)}
                    // inputProps={{ "aria-label": "controlled" }}
                  />
                  {/* <label>Valid</label>
                  <input
                    type="text"
                    onChange={(e) => setValidDoss(e.target.value)}
                    value={validDoss}
                  /> */}
                </div>
                <div className={style.field}>
                  {dossValid && (
                    <>
                      <label>Valider Par</label>
                      <UsersSelect idUser={idUser} setIdUser={setIdUser} />
                    </>
                  )}
                </div>
                <div className={style.field}></div>
                <div className={style.field}></div>
              </div>
              {/* <div className={style.fields}>
                
                <div className={style.field}></div>
                <div className={style.field}></div>
              </div> */}
              <div className={style.modelBtns}>
                <button onClick={() => addNewDossier()}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {displayNewTypeDoss && (
        <NewTypeDoss setDisplayNewTypeDoss={setDisplayNewTypeDoss} />
      )}
    </div>
  );
}

export default Dossiers;
