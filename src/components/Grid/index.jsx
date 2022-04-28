import { AgGridReact } from "ag-grid-react";
import { useContext, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";
const Grid = ({ columns }) => {
  const { dossiers } = useContext(GlobalContext);
  const gridRef = useRef();

  const defaultColDef = {
    editable: true,
    flex: 1,
    sortable: true,
    filter: true,
  };
  return (
    <div className="ag-theme-material h-56">
      <AgGridReact
        ref={gridRef}
        columnDefs={columns}
        rowData={dossiers}
        defaultColDef={defaultColDef}
        rowSelection="single"
        editType="fullRow"
        getRowNodeId={(data) => data.id}
        suppressClickEdit
      />
    </div>
  );
};

export default Grid;
