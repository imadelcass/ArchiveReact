import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";
import style from "./style.module.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import axios from "axios";
import BeneficiaireAction from "./BeneficiaireAction";

function BeneficiereGrid(props) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [beneficieres, setBeneficieres] = useState([]);
  const gridRef = useRef();
  //return grid ref to parent
  props.getGridRef(gridRef);
  const getBeneficiers = async () => {
    try {
      const req = await axios.get(`${baseUrl}/beneficieres  `);
      const data = await req.data;
      setBeneficieres(data);
    } catch (error) {
      console.log(error);
    }
  };
  useState(() => {
    getBeneficiers();
  }, []);
  const columnDefs = [
    {
      headerName: "Code",
      field: "CODEBENEFICIAIRE",
    },
    {
      headerName: "Nom",
      field: "NOMBENEFICIAIRE",
    },
    {
      headerName: "Adresse",
      field: "RUE",
    },
    {
      headerName: "Ville",
      field: "VILLE",
    },
    {
      headerName: "CP",
      field: "CP",
    },
    {
      headerName: "Email",
      field: "EMAIL",
    },
    {
      headerName: "Tel",
      field: "TEL",
    },
    {
      headerName: "Contact",
      field: "CONTACT",
    },
    {
      headerName: "GSM",
      field: "GSM",
    },
    {
      headerName: "Action",
      field: "action",
      sortable: false,
      filter: false,
      editable: false,
      headerClass: "actionHeaderCol",
      cellRenderer: (props) => (
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
        rowData={beneficieres}
        defaultColDef={defaultColDef}
        rowSelection="single"
        editType="fullRow"
        getRowNodeId={(data) => data.id}
        suppressClickEdit
        stopEditingWhenCellsLoseFocus
      />
    </div>
  );
}

export default BeneficiereGrid;
