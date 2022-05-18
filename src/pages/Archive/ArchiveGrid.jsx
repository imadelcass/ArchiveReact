import { AgGridReact } from 'ag-grid-react';
import { useEffect, useRef, useState } from 'react';
import AxiosConfig from '../../AxiosConfig';
import style from './style.module.scss';
import ActionComponentCell from './ActionComponentCell';
import { IconButton, Tooltip } from '@mui/material';
import Print from '@mui/icons-material/Print';
import Add from '@mui/icons-material/Add';
import './ag-grid.style.scss';
import Header from '../../components/Header';
import useData from '../../hooks/useData';

function ArchiveGrid() {
  const { data } = useData({ url: '/archive' });
  const gridRef = useRef();
  const defaultColDef = {
    filter: 'agTextColumnFilter',
    headerClass: 'headerGrid',
    editable: true,
  };
  const columnDefs = [
    {
      headerName: 'Code',
      field: 'codeArchive',
      sortable: true,
      filter: true,
      flex: 3,
      headerHeight: 400,
    },
    {
      headerName: 'Intitul',
      field: 'intitulArchive',
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
        <ActionComponentCell gridRef={gridRef} props={props} />
      ),
    },
  ];
  //button print clicked
  const onBtPrint = e => {
    e.preventDefault();
    gridRef.current.columnApi.setColumnVisible('action', false);
    setTimeout(() => {
      window.print();
      gridRef.current.columnApi.setColumnVisible('action', true);
    }, 100);
  };
  const addNewBtn = e => {
    // const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({
      add: [{ codeArchive: '', intitulArchive: '' }],
    });
    setTimeout(() => {
      gridRef.current.api.startEditingCell({
        rowIndex: res.add[0].rowIndex,
        colKey: 'codeArchive',
      });
    }, 300);
  };
  return (
    <div className={style.archive}>
      <Header title='Locaux' />
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
      <div className={`${style.table} ag-theme-material`}>
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
export default ArchiveGrid;
