import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';
import style from './style.module.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import BeneficiaireAction from './BeneficiaireAction';
import useData from '../../hooks/useData';
function BeneficiereGrid(props) {
  const gridRef = useRef();
  const { data } = useData({ url: '/beneficieres' });
  //return grid ref to parent
  props.getGridRef(gridRef);
  const columnDefs = [
    {
      headerName: 'Code',
      field: 'CODEBENEFICIAIRE',
    },
    {
      headerName: 'Nom',
      field: 'NOMBENEFICIAIRE',
    },
    {
      headerName: 'Adresse',
      field: 'RUE',
    },
    {
      headerName: 'Ville',
      field: 'VILLE',
    },
    {
      headerName: 'CP',
      field: 'CP',
    },
    {
      headerName: 'Email',
      field: 'EMAIL',
    },
    {
      headerName: 'Tel',
      field: 'TEL',
    },
    {
      headerName: 'Contact',
      field: 'CONTACT',
    },
    {
      headerName: 'GSM',
      field: 'GSM',
    },
    {
      headerName: 'Action',
      field: 'action',
      sortable: false,
      filter: false,
      editable: false,
      headerClass: 'actionHeaderCol',
      cellRenderer: props => (
        <BeneficiaireAction gridRef={gridRef} props={props} />
      ),
    },
  ];
  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    editable: true,
  };
  return (
    <div className={`${style.BeneficiereGrid} ag-theme-material`}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={defaultColDef}
        rowSelection='single'
        editType='fullRow'
        getRowNodeId={data => data.id}
        suppressClickEdit
        stopEditingWhenCellsLoseFocus
      />
    </div>
  );
}

export default BeneficiereGrid;
