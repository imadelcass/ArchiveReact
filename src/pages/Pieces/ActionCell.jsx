import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Update from "@mui/icons-material/Update";
import Cancel from "@mui/icons-material/Cancel";
import { IconButton, Tooltip } from "@mui/material";
import { memo, useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
import { AlertContext } from "../../context/AlertContext";

const ActionCell = ({ props, gridRef }) => {
  const [editing, setEditing] = useState(false);
  const { setAlert } = useContext(AlertContext);
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
  const displayPiece = () => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.colId,
    });
  };
  const cancelUpdatePiece = () => {
    props.api.stopEditing(true);
  };
  const updatePiece = async () => {
    props.api.stopEditing(false);
    try {
      const req = await axios.put(`/piece/update`, props.data);
      const data = await req.data;
      console.log(data);
      // execute alert
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
  const deletePiece = async () => {
    try {
      const req = await axios.delete(`/piece/destroy/${props.data.id}`);
      const data = await req.data;
      console.log(data);
      if (data.success) {
        //   if delete succeeded in db => delete the row in client side
        const selectedData = gridRef.current.api.getSelectedRows();
        gridRef.current.api.applyTransaction({ remove: selectedData });
        gridRef.current.api.refreshCells({ force: true });
      }
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
    <div className="flex items-center justify-center">
      {editing ? (
        <>
          <div className="" onClick={() => updatePiece()}>
            <Tooltip title="Update" arrow>
              <IconButton>
                <Update fontSize={"100px"} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="" onClick={() => cancelUpdatePiece()}>
            <Tooltip title="Cancel" arrow>
              <IconButton>
                <Cancel fontSize={"small"} />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <div className="" onClick={() => displayPiece()}>
            <Tooltip title="Edit" arrow>
              <IconButton>
                <EditIcon fontSize={"100px"} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="" onClick={() => deletePiece()}>
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
};

export default ActionCell;