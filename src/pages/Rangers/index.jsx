import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import ArchivesCombobox from "./ArchivesCombobox";
import ActionCell from "./ActionCell";
import { IconButton, Tooltip } from "@mui/material";
import { Add, Close, Print } from "@mui/icons-material";
import style from "./style.module.scss";
import { AlertContext } from "../../context/AlertContext";
import Header from "../../components/Header";

function Rangers() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const gridRef = useRef();
  //STATES
  const { setAlert } = useContext(AlertContext);
  const [rangers, setRangers] = useState([]);
  const [archives, setArchives] = useState([]);
  const [refArchives, setRefArchives] = useState({});
  const [display, setDisplay] = useState(false);
  const [idArchive, setIdArchive] = useState(2);
  const [codeRanger, setCodeRanger] = useState("");
  const [intitulRanger, setIntitulRanger] = useState("");
  const [nbrLignes, setNbrLignes] = useState("");
  const [nbrColonnes, setNbrColonnes] = useState("");
  const getArchives = async () => {
    try {
      const req = await axios.get(`${baseUrl}/archive`);
      const data = await req.data;

      setArchives(() => data);
      //after getting the archives set refarchives (key, val) object
      setRefArchives(() => {
        let obj = {};
        data.map((a) => {
          obj[a.id] = a.intitulArchive;
        });
        return obj;
      });
    } catch (error) {
      console.log(error);
    }
  };
  //FUNCTIONS
  useEffect(() => {
    getRangers();
    getArchives();
  }, []);

  const extractValues = (mappings) => {
    return Object.keys(mappings);
  };
  const columns = [
    {
      headerName: "code",
      field: "codeRanger",
    },
    {
      headerName: "intitul",
      field: "intitulRanger",
    },
    {
      headerName: "Archive",
      field: "idArchive",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: extractValues(refArchives),
      },
      refData: refArchives,
    },
    {
      headerName: "nbrLignes",
      field: "nbrLignes",
    },
    {
      headerName: "nbrColonnes",
      field: "nbrColonnes",
    },
    {
      field: "Action",
      editable: false,
      sortable: true,
      filter: false,
      headerClass: "actionHeaderCol",
      cellRenderer: (props) => <ActionCell props={props} gridRef={gridRef} />,
    },
  ];
  const defaultColDef = {
    flex: 3,
    editable: true,
    sortable: true,
    filter: true,
  };
  const getRangers = async () => {
    try {
      const req = await axios.get(`${baseUrl}/rangers`);
      const data = await req.data;
      setRangers(() => data);
    } catch (error) {
      console.log(error);
    }
  };
  const ranger = {
    codeRanger,
    intitulRanger,
    nbrLignes,
    nbrColonnes,
    idArchive,
  };
  const addNewRanger = async () => {
    // console.log(ranger);
    try {
      const req = await axios.post(`${baseUrl}/ranger/add`, ranger);
      const data = await req.data;
      if (data.success) {
        gridRef.current.api.applyTransaction({ add: [data.ranger] });
        gridRef.current.api.refreshCells({ force: true });
      }
      setDisplay(false);
      //execute alert
      setAlert(() => {
        return {
          state: true,
          text: data.msg,
          severity: data.severity,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header title="Rangeres"/>
      <div className="h-72 w-10/12 m-auto ag-theme-material">
        <div className={style.printWrapper}>
          <Tooltip title="add new" placement="top" arrow>
            <IconButton>
              <Add
                className={style.printBtn}
                color="action"
                onClick={() => setDisplay(true)}
                // onClick={(e) => addNewBtn(e)}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print" placement="top" arrow>
            <IconButton>
              <Print
                className={style.printBtn}
                color="action"
                // onClick={(e) => onBtPrint(e)}
              />
            </IconButton>
          </Tooltip>
        </div>
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          rowData={rangers}
          defaultColDef={defaultColDef}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
          rowSelection="single"
          editType="fullRow"
          getRowNodeId={(data) => data.id}
          suppressClickEdit
          stopEditingWhenCellsLoseFocus
        />
        {display && (
          <div className="w-full h-full bg-primer fixed top-0 left-0">
            <div className={style.newRanger} style={{ margin: "auto" }}>
              <div className={style.modelHeader}>
                <div className={style.modelTitle}>Add new Ranger</div>
                <Tooltip title="Close" placement="bottom" arrow>
                  <Close
                    className={style.closeBtnInner}
                    onClick={() => setDisplay(false)}
                  />
                </Tooltip>
              </div>
              <div className={style.modelWrapper}>
                <div className={style.fields}>
                  <div className={style.field}>
                    <label>Code</label>
                    <input
                      type="text"
                      onChange={(e) => setCodeRanger(e.target.value)}
                      value={codeRanger}
                    />
                  </div>
                  <div className={style.field}>
                    <label>Intitule</label>
                    <input
                      type="text"
                      onChange={(e) => setIntitulRanger(e.target.value)}
                      value={intitulRanger}
                    />
                  </div>
                </div>
                <div className={style.fields}>
                  <div className={style.field}>
                    <label>Nombre des lignes</label>
                    <input
                      type="text"
                      onChange={(e) => setNbrLignes(e.target.value)}
                      value={nbrLignes}
                    />
                  </div>
                  <div className={style.field}>
                    <label>Nombre des colonnes</label>
                    <input
                      type="text"
                      onChange={(e) => setNbrColonnes(e.target.value)}
                      value={nbrColonnes}
                    />
                  </div>
                </div>
                <div className={style.fields}>
                  <div className={style.field}>
                    <label>Archive</label>
                    <ArchivesCombobox
                      idArchive={idArchive}
                      setIdArchive={setIdArchive}
                    />
                  </div>
                  <div className={style.field}></div>
                </div>
                <div className={style.modelBtns}>
                  <button onClick={() => addNewRanger()}>Add</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rangers;
