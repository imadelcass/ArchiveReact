import { AgGridReact } from 'ag-grid-react';
import style from './style.module.scss';
import AxiosConfig from '../../AxiosConfig';
import ActionComponentCell from './ActionComponentCell';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import { IconButton, Tooltip } from '@mui/material';
import Print from '@mui/icons-material/Print';
import Add from '@mui/icons-material/Add';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './ag-grid.style.scss';
import ServiceActionCell from './ServiceActionCell';
import Header from '../../components/Header';
import useData from '../../hooks/useData';
function ServiceGrid() {
  const gridRef = useRef();
  const { data } = useData({ url: '/service' });
  const defaultColDef = {
    filter: 'agTextColumnFilter',
    headerClass: 'headerGrid',
    editable: true,
  };
  const columnDefs = [
    {
      headerName: 'Code',
      field: 'codeService',
      sortable: true,
      filter: true,
      flex: 3,
      headerHeight: 400,
    },
    {
      headerName: 'Intitul',
      field: 'libService',
      sortable: true,
      filter: true,
      flex: 6,
    },
    {
      headerName: 'Action',
      field: 'action',
      flex: 3,
      filter: false,
      editable: false,
      headerClass: 'actionHeaderCol',
      cellRenderer: props => (
        <ServiceActionCell gridRef={gridRef} props={props} />
      ),
    },
  ];
  const onBtPrint = e => {
    e.preventDefault();
    gridRef.current.columnApi.setColumnVisible('action', false);
    setTimeout(() => {
      window.print();
      gridRef.current.columnApi.setColumnVisible('action', true);
    }, 100);
  };
  const addNewBtn = async e => {
    // const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({
      add: [{ codeService: '', libService: '' }],
    });
    setTimeout(() => {
      gridRef.current.api.startEditingCell({
        rowIndex: res.add[0].rowIndex,
        colKey: 'libService',
      });
    }, 300);
  };
  return (
    <div className={style.service}>
      <Header title='Services' />
      <div className={style.printWrapper}>
        <Tooltip title='add new' placement='top' arrow>
          <IconButton>
            <Add
              className={style.printBtn}
              color='action'
              onClick={e => addNewBtn(e)}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title='Print' placement='top' arrow>
          <IconButton>
            <Print
              className={style.printBtn}
              color='action'
              onClick={e => onBtPrint(e)}
            />
          </IconButton>
        </Tooltip>
      </div>
      <div id='myGrid' className={`${style.table} ag-theme-material`}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
          defaultColDef={defaultColDef}
          rowSelection='single'
          editType='fullRow'
          suppressClickEdit
        />
      </div>
    </div>
  );
}

export default ServiceGrid;
