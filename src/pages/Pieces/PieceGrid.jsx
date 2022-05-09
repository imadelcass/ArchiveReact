import { AgGridReact } from 'ag-grid-react';
import { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import style from './style.module.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { IconButton, Tooltip } from '@mui/material';
import { Add, Print } from '@mui/icons-material';
import NewPiece from './NewPiece';
import ActionCell from './ActionCell';

const PieceGrid = ({ pieces }) => {
  const { refDossiers, refPieceTypes, setPdf } = useContext(GlobalContext);
  const [display, setDisplay] = useState(false);
  const gridRef = useRef();
  const extractValues = mappings => {
    return Object.keys(mappings);
  };
  const columns = [
    {
      field: 'numPiece',
      headerName: 'Num',
    },
    {
      field: 'idTypePiece',
      headerName: 'Type',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refPieceTypes),
      },
      refData: refPieceTypes,
    },
    {
      field: 'intitulePiece',
      headerName: 'Intitule',
    },
    {
      field: 'idDossier',
      headerName: 'Dossier',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: extractValues(refDossiers),
      },
      refData: refDossiers,
    },
    {
      headerName: 'Action',
      editable: false,
      filter: false,
      headerClass: 'actionHeaderCol',
      cellRenderer: props => <ActionCell props={props} gridRef={gridRef} />,
    },
  ];
  const defaultColDef = {
    editable: true,
    flex: 1,
    sortable: true,
    filter: true,
  };

  // const onRowClicked = props => {
  //   console.log(pieces);
  //   //file:///D:/Laravel/archiveProject/public/files/1650623812.pdf
  // };
  const onSelectionChanged = () => {
    let file = gridRef.current.api.getSelectedRows()[0].file;
    setPdf(
      `D:/Laravel/archiveProject/public/files/1650623812.pdf`
    );
  };

  return (
    <div className={style.pieceGrid}>
      <div className='flex justify-end h-10'>
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
      <div className={`ag-theme-material h-96`}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowData={pieces}
          rowSelection='single'
          editType='fullRow'
          suppressClickEdit
          // onRowClicked={props => onRowClicked(props)}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
      {display && <NewPiece display={display} setDisplay={setDisplay} />}
    </div>
  );
};

export default PieceGrid;
