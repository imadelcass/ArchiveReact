import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Update from '@mui/icons-material/Update';
import Cancel from '@mui/icons-material/Cancel';
import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import AxiosConfig from '../../AxiosConfig';
import { AlertContext } from '../../context/AlertContext';
function ActionCell({ props, gridRef }) {
  //states
  const [editing, setEditing] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const axios = AxiosConfig();
  //functions
  useEffect(() => {
    props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
    props.api.addEventListener('rowEditingStopped', onRowEditingStopped);
    return () => {
      props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
      props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
    };
  }, []);

  const onRowEditingStarted = params => {
    if (props.node === params.node) {
      setEditing(true);
    }
  };
  const onRowEditingStopped = params => {
    if (props.node === params.node) {
      setEditing(false);
    }
  };
  const displayUser = () => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.colId,
    });
  };
  const cancelUpdateUser = () => {
    props.api.stopEditing(true);
  };
  const updateUser = async () => {
    props.api.stopEditing(false);
    console.log(props.data);
    try {
      const req = await axios.post(`/user/add`, props.data);
      const data = await req.data;
      console.log(data);
    } catch (error) {
      console.log('error', error);
    }
  };
  const deleteUser = async () => {
    try {
      const req = await axios.delete(`user/destroy/${props.data.id}`);
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
    <div className={style.RowAction}>
      {editing ? (
        <>
          <div className={style.editArchive} onClick={() => updateUser()}>
            <Tooltip title='Update' arrow>
              <IconButton>
                <Update fontSize={'100px'} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            className={style.deleteArchive}
            onClick={() => cancelUpdateUser()}
          >
            <Tooltip title='Cancel' arrow>
              <IconButton>
                <Cancel fontSize={'small'} />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <div className={style.editArchive} onClick={() => displayUser()}>
            <Tooltip title='Edit' arrow>
              <IconButton>
                <EditIcon fontSize={'100px'} />
              </IconButton>
            </Tooltip>
          </div>
          <div className={style.deleteArchive} onClick={() => deleteUser()}>
            <Tooltip title='Delete' arrow>
              <IconButton>
                <DeleteIcon fontSize={'small'} />
              </IconButton>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}

export default ActionCell;
