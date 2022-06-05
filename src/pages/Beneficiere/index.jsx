import { Add, Print, Close } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BeneficiereGrid from "./BeneficiereGrid";
import style from "./style.module.scss";
import { AlertContext } from "../../context/AlertContext";
import Header from "../../components/Header";

function Beneficiere() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  //************states****************//
  const [display, setDisplay] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [contact, setContact] = useState("");
  const [gsm, setGsm] = useState("");
  const [gridRef, setGridRef] = useState(null);
  const { setAlert } = useContext(AlertContext);
  const beneficiaire = {
    code,
    name,
    adresse,
    ville,
    codePostal,
    email,
    tel,
    contact,
    gsm,
  };
  //************functions****************//

  const addNewBeneficiere = async () => {
    try {
      const req = await axios.post(`${baseUrl}/beneficiaire/add`, beneficiaire);
      const data = await req.data;
      if (data.success) {
        setDisplay(false);
        gridRef.current.api.applyTransaction({ add: [data.beneficiaire] });
        gridRef.current.api.refreshCells({ force: true });
        //execute alert
        setAlert(() => {
          return {
            state: true,
            text: "Le beneficiaire est bien ajouter.",
            severity: "success",
          };
        });
      }
    } catch (error) {
      setDisplay(false);
      setAlert(() => {
        return {
          state: true,
          text: "Le beneficiaire est pas ajouter.",
          severity: "error",
        };
      });
      console.log(error);
    }
  };

  
  const onBtPrint = () => {};
  return (
    <div className={style.beneficiere}>
      <Header title="Beneficiaires"/>
      <div className={style.printWrapper}>
        <Tooltip title="add new" placement="top" arrow>
          <IconButton>
            <Add
              className={style.printBtn}
              color="action"
              onClick={() => setDisplay((prev) => !prev)}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print" placement="top" arrow>
          <IconButton>
            <Print
              className={style.printBtn}
              color="action"
              onClick={() => onBtPrint()}
            />
          </IconButton>
        </Tooltip>
      </div>
      <BeneficiereGrid getGridRef={setGridRef} />
      {display && (
        <div
          className={style.newBeneficiereWrapper}
          // onClick={() => setDisplay(false)}
        >
          <div className={style.newBeneficiere}>
            <div className={style.modelHeader}>
              <div className={style.modelTitle}>Add new beneficiere</div>
              <Tooltip title="Close" placement="bottom" arrow>
                <Close
                  className={style.closeBtnInner}
                  onClick={() => setDisplay((prev) => !prev)}
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
                  <label>Nom</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
              <div className={style.fields}>
                <div className={style.field}>
                  <label>GSM</label>
                  <input
                    type="text"
                    onChange={(e) => setGsm(e.target.value)}
                    value={gsm}
                  />
                </div>
                <div className={style.field}>
                  <label>Ville</label>
                  <input
                    type="text"
                    onChange={(e) => setVille(e.target.value)}
                    value={ville}
                  />
                </div>
              </div>
              <div className={style.fields}>
                <div className={style.field}>
                  <label>Code Postal</label>
                  <input
                    type="text"
                    onChange={(e) => setCodePostal(e.target.value)}
                    value={codePostal}
                  />
                </div>
                <div className={style.field}>
                  <label>E-mail</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div className={style.fields}>
                <div className={style.field}>
                  <label>Tel</label>
                  <input
                    type="text"
                    onChange={(e) => setTel(e.target.value)}
                    value={tel}
                  />
                </div>
                <div className={style.field}>
                  <label>Contact</label>
                  <input
                    type="text"
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                  />
                </div>
              </div>
              <div className={`${style.field} ${style.fieldFull}`}>
                <label>Adresse</label>
                {/* <input
                  type=""
                  onChange={(e) => setAdresse(e.target.value)}
                  value={adresse}
                /> */}
                <textarea
                  rows="3"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                ></textarea>
              </div>
              <div className={style.modelBtns}>
                <button onClick={() => addNewBeneficiere()}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Beneficiere;
