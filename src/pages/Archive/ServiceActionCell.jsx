import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Update from "@mui/icons-material/Update";
import Cancel from "@mui/icons-material/Cancel";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
function ServiceActionCell({ gridRef, props }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [editing, setEditing] = useState(false);
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




  
  const updateService = async () => {
    props.api.stopEditing(false);
    try {
      const req = await axios.post(`${baseUrl}/service/add`, props.data);
      const data = await req.data;
      console.log(data);
      //   if (data.success) {
      //     getArchives();
      //   }
    } catch (error) {
      console.log(error);
    }
  };











  const cancelUpdateService = () => {
    props.api.stopEditing(true);
  };
  const displayService = () => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.colId,
    });
  };
  const deleteService = async () => {
    try {
      const req = await axios.delete(
        `${baseUrl}/service/destroy/${props.data.id}`
      );
      const data = await req.data;
      if (data.success) {
        //   if delete succeeded in db => delete the row in client side
        const selectedData = gridRef.current.api.getSelectedRows();
        gridRef.current.api.applyTransaction({ remove: selectedData });
        gridRef.current.api.refreshCells({ force: true });

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.RowAction}>
      {editing ? (
        <>
          <div className={style.editArchive} onClick={() => updateService()}>
            <Tooltip title="Update" arrow>
              <IconButton>
                <Update fontSize={"100px"} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            className={style.deleteArchive}
            onClick={() => cancelUpdateService()}
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
          <div className={style.editArchive} onClick={() => displayService()}>
            <Tooltip title="Edit" arrow>
              <IconButton>
                <EditIcon fontSize={"100px"} />
              </IconButton>
            </Tooltip>
          </div>
          <div className={style.deleteArchive} onClick={() => deleteService()}>
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

export default ServiceActionCell;
