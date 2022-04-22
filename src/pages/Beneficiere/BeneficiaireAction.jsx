import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Update from "@mui/icons-material/Update";
import Cancel from "@mui/icons-material/Cancel";
import { IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
import { AlertContext } from "../../context/AlertContext";
function BeneficiaireAction({ props, gridRef }) {
  //states
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [editing, setEditing] = useState(false);
  const { setAlert } = useContext(AlertContext);
  //functions
  useEffect(() => {
    props.api.addEventListener("rowEditingStarted", onRowEditingStarted);
    props.api.addEventListener("rowEditingStopped", onRowEditingStopped);
    return () => {
      props.api.removeEventListener("rowEditingStarted", onRowEditingStarted);
      props.api.removeEventListener("rowEditingStopped", onRowEditingStopped);
    };
  }, []);

  const onRowEditingStarted = (params) => {
    if (props.node === params.node) {
      setEditing(true);
    }
  };
  const onRowEditingStopped = (params) => {
    if (props.node === params.node) {
      setEditing(false);
    }
  };
  const displayBeneficiaire = () => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.colId,
    });
  };
  const cancelUpdateBeneficiaire = () => {
    props.api.stopEditing(true);
  };
  const updateBeneficiaire = async () => {
    props.api.stopEditing(false);
    try {
      const req = await axios.put(`${baseUrl}/beneficiaire/update`, props.data);
      const data = await req.data;
      if (data.success) {
        //execute alert
        setAlert(() => {
          return {
            state: true,
            text: "Le beneficiaire est bien modifier.",
            severity: "success",
          };
        });
      }
    } catch (error) {
      console.log(error);
      // execute alert
      setAlert(() => {
        return {
          state: true,
          text: "Le beneficiaire est pas modifier.",
          severity: "error",
        };
      });
    }
  };
  const deleteBeneficiaire = async () => {
    try {
      const req = await axios.delete(
        `${baseUrl}/beneficiaire/destroy/${props.data.id}`
      );
      const data = await req.data;
      if (data.success) {
        //   if delete succeeded in db => delete the row in client side
        const selectedData = gridRef.current.api.getSelectedRows();
        gridRef.current.api.applyTransaction({ remove: selectedData });
        gridRef.current.api.refreshCells({ force: true });
        //execute alert
        setAlert(() => {
          return {
            state: true,
            text: "Le beneficiaire est bien supprimmer.",
            severity: "success",
          };
        });
      }
    } catch (error) {
      console.log(error);
      //execute alert
      setAlert(() => {
        return {
          state: true,
          text: "Le beneficiaire est pas supprimmer.",
          severity: "error",
        };
      });
    }
  };
  return (
    <div className={style.RowAction}>
      {editing ? (
        <>
          <div
            className={style.editArchive}
            onClick={() => updateBeneficiaire()}
          >
            <Tooltip title="Update" arrow>
              <IconButton>
                <Update fontSize={"100px"} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            className={style.deleteArchive}
            onClick={() => cancelUpdateBeneficiaire()}
          >
            <Tooltip title="Cancel" arrow>
              <IconButton>
                <Cancel fontSize={"small"} />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <div
            className={style.editArchive}
            onClick={() => displayBeneficiaire()}
          >
            <Tooltip title="Edit" arrow>
              <IconButton>
                <EditIcon fontSize={"100px"} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            className={style.deleteArchive}
            onClick={() => deleteBeneficiaire()}
          >
            <Tooltip title="Delete" arrow>
              <IconButton>
                <DeleteIcon fontSize={"small"} />
              </IconButton>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}

export default BeneficiaireAction;
