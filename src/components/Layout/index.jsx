import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
function Layout({ children }) {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className={style.layout}>
      <div className={style.navbar}>
        <div className={style.logo}>Logo</div>
        <nav className={style.nav}>
          <a href="#">Contact</a>
          <a href="#">Contact</a>
          <a href="#">Contact</a>
        </nav>
      </div>
      <div className={style.pageWrapper}>
        <div className={style.verticalMenu}>
          <div className={style.MenuItem}>
            <Link to={"/archive"} className="text-center">
              <ApartmentIcon />
              <p>Locaux & Services</p>
            </Link>
          </div>
          <div className={style.MenuItem}>
            <Link to={"/beneficiere"} className="text-center">
              <SupervisedUserCircleIcon />
              <p>Beneficiaires</p>
            </Link>
          </div>
          <div className={style.MenuItem}>
            <Link to={"/Rangers"} className="text-center">
              <SupervisedUserCircleIcon />
              <p>Rangers</p>
            </Link>
          </div>
          <div className={`border-b border-white`}>
            <div
              onClick={() => setCollapse((prev) => !prev)}
              className={`text-white text-center py-2 cursor-pointer`}
            >
              <FolderCopyIcon />
              <p>Dossiers</p>
            </div>
            {collapse && (
              <div className={`flex flex-col justify-start	text-white z-0`}>
                <Link to={"/dossiers"} className="pl-2 py-1">
                  Mise a jour
                </Link>
                <Link to={"/dossiers/pieces-fornis"} className="pl-2 py-1">
                  Pieces fornis
                </Link>
                <Link to={"/dossiers/pieces-manquants"} className="pl-2 py-1">
                  Pieces manquants
                </Link>
              </div>
            )}
          </div>
          {/* <div className={style.MenuItem}>
            <Link to={"/dossiers"} className="text-center">
              <FolderCopyIcon />
              <p>Dossiers</p>
            </Link>
          </div> */}

          <div className={style.MenuItem}>
            <Link to={"/pieces"} className="text-center">
              <SupervisedUserCircleIcon />
              <p>Pieces</p>
            </Link>
          </div>
        </div>

        <div className={style.pageContent}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
