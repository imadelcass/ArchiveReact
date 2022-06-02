import { AgGridReact } from 'ag-grid-react';
import AxiosConfig from '../../AxiosConfig';
import { useEffect, useRef, useState } from 'react';
import { Add, Close, Print } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import style from './style.module.scss';
import Header from '../../components/Header';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import ActionCell from './ActionCell';
const Users = () => {
  const gridRef = useRef();
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [refServices, setRefServices] = useState({});
  const axios = AxiosConfig();
  const getUsers = async () => {
    try {
      const req = await axios.get('/users');
      const res = await req.data;
      if (res.success) {
        setUsers(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getServices = async () => {
    try {
      const req = await axios.get(`/service`);
      const data = await req.data;
      console.log(data);
      setServices(() => data);

      setRefServices(() => {
        let obj = {};
        data.map(e => {
          obj[e.id] = e.libService;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const extractValues = mappings => {
    return Object.keys(mappings);
  };
  //FUNCTIONS
  useEffect(() => {
    getUsers();
    getServices();
  }, []);

  const columns = [
    {
      headerName: 'Nom',
      field: 'name',
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Mot de pass',
      field: 'password',
      cellRenderer: () => <p style={{ paddingTop: 5 }}>**************</p>,
    },
    {
      headerName: 'Type',
      field: 'type',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['user', 'admin', 'master'],
      },
      // refData: { 1: 'admin', 2: 'master' },
    },
    {
      headerName: 'Service',
      field: 'idService',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: Object.keys(refServices),
      },
      refData: refServices,
    },
    {
      field: 'Action',
      editable: false,
      sortable: true,
      filter: false,
      headerClass: 'actionHeaderCol',
      cellRenderer: props => <ActionCell props={props} gridRef={gridRef} />,
    },
  ];
  const defaultColDef = {
    flex: 3,
    editable: true,
    sortable: true,
    filter: true,
  };
  const addNewBtn = e => {
    // const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({
      add: [{ name: '' }],
    });
    setTimeout(() => {
      gridRef.current.api.startEditingCell({
        rowIndex: res.add[0].rowIndex,
        colKey: 'name',
      });
    }, 300);
  };
  return (
    <div>
      <Header title='Utilisateurs' />
      <div className='w-10/12 m-auto'>
        <div
          className={style.printWrapper}
          onClick={() => console.log(Object.keys(refServices))}
        >
          <Tooltip title='add new' placement='top' arrow>
            <IconButton>
              <Add
                className={style.printBtn}
                color='action'
                onClick={e => addNewBtn(e)}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className='h-72 w-full ag-theme-material'>
          <AgGridReact
            ref={gridRef}
            columnDefs={columns}
            rowData={users}
            defaultColDef={defaultColDef}
            rowSelection='single'
            editType='fullRow'
            suppressClickEdit
            stopEditingWhenCellsLoseFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
