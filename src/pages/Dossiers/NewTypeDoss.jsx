import { Close } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";
import style from "./style.module.scss";

const NewTypeDoss = ({ setDisplayNewTypeDoss }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [code, setCode] = useState("");
  const [libel, setLibel] = useState("");
  const { setAlert } = useContext(AlertContext);
  const addNewDossierType = async () => {
    try {
      const req = await axios.post(`${baseUrl}/typedossier/add`, {
        code,
        libel,
      });
      const data = await req.data;
      setDisplayNewTypeDoss(false);
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
    <div className="w-full h-full bg-primer fixed top-0 left-0">
      <div className={style.newDossier}>
        <div className={style.modelHeader}>
          <div className={style.modelTitle}>Add new Dossier Type</div>
          <Tooltip title="Close" placement="bottom" arrow>
            <Close
              className={style.closeBtnInner}
              onClick={() => setDisplayNewTypeDoss(false)}
            />
          </Tooltip>
        </div>
        <div className={style.modelWrapper}>
          <div className={style.fields}>
            <div className={style.field}>
              <label>Code</label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
            </div>
            <div className={style.field}>
              <label>Libelle</label>
              <input
                type="text"
                onChange={(e) => setLibel(e.target.value)}
                value={libel}
              />
            </div>
          </div>
          <div className={style.modelBtns}>
            <button onClick={() => addNewDossierType()}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTypeDoss;
