import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { Print } from "@mui/icons-material";
import ReactToPrint from "react-to-print";

const PiecesFornis = () => {
  const componentRef = useRef();

  const { dossiers } = useContext(GlobalContext);
  const [dossier, setDossier] = useState(dossiers[0]);
  const columns = [
    {
      field: "numPiece",
      headerName: "Num",
    },
    {
      field: "type.IntituleTypePiece",
      headerName: "Type",
      //   cellEditor: "agSelectCellEditor",
      //   cellEditorParams: {
      //     values: extractValues(refPieceTypes),
      //   },
      //   refData: refPieceTypes,
    },
    {
      field: "intitulePiece",
      headerName: "Intitule",
    },
  ];
  const defaultColDef = {
    editable: true,
    flex: 1,
    sortable: true,
    filter: true,
  };

  const print = () => {
    window.print();
  };

  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className="border-4 border-black">
        <div className="flex flex-col pt-4 pl-4">
          <div className="mb-4">
            <label className="pr-4">N° Dossier : </label>
            <Select
              value={dossier}
              onChange={(e) => {
                console.log(e);
                setDossier(e.target.value);
              }}
            >
              {dossiers.map((e) => {
                return <MenuItem value={e}>{e.NUMDOSSIER}</MenuItem>;
              })}
            </Select>
          </div>
          <div>
            <label className="pr-4">Beneficiaire : </label>
            <label>{dossier?.beneficiaire?.CODEBENEFICIAIRE}</label>
          </div>
        </div>
        <h1 className="mt-8 text-center text-xl">List des pieces fournis</h1>
        <div className="flex justify-end h-10">
          <Tooltip title="Print" placement="top" arrow>
            <IconButton onClick={() => print()}>
              <Print color="action" />
            </IconButton>
          </Tooltip>
        </div>
        <div className={`ag-theme-material h-96 border`}>
          <AgGridReact
            columnDefs={columns}
            rowData={dossier != undefined ? dossier.pieces : []}
            defaultColDef={defaultColDef}
            style={{ width: '100vw' }}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
      </div>
    </>
  );
};

export default PiecesFornis;
