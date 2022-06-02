import { AgGridReact } from 'ag-grid-react';
import AxiosConfig from '../../AxiosConfig';
import { useContext, useRef } from 'react';
import { GlobalContext } from '../../context/GlobalState';
const Grid = ({ columns, dossiers, setDossier, setTypePieces }) => {

  const axios = AxiosConfig();
  const gridRef = useRef();
  const defaultColDef = {
    editable: true,
    flex: 1,
    sortable: true,
    filter: true,
  };
  const getPiecesManquants = async id => {
    try {
      const req = await axios.get('/typepieces', {
        params: {
          PiecesManquants: true,
          idDossier: id,
        },
      });
      const res = await req.data;
      setTypePieces(() => res);
    } catch (error) {
      console.log(error);
    }
  };
  const onSelectionChanged = () => {
    setDossier(() => gridRef.current.api.getSelectedRows()[0]);
    let idDossier = gridRef.current.api.getSelectedRows()[0].id;
    getPiecesManquants(idDossier);
  };
  return (
    <div className='ag-theme-material h-56'>
      <AgGridReact
        ref={gridRef}
        columnDefs={columns}
        rowData={dossiers}
        defaultColDef={defaultColDef}
        rowSelection='single'
        editType='fullRow'
        getRowNodeId={data => data.id}
        suppressClickEdit
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
};

export default Grid;
