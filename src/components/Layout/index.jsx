import { Link } from "react-router-dom";
import style from "./style.module.scss";
function Layout({ children }) {
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
            <Link to={"/archive"}>Locaux & Services</Link>
          </div>
          <div className={style.MenuItem}>
            <Link to={"/beneficiere"}>Beneficiaires</Link>
          </div>
          <div className={style.MenuItem}>
            <Link to={"/Rangers"}>Rangers</Link>
          </div>
          <div className={style.MenuItem}>
            <Link to={"/dossiers"}>Dossiers</Link>
          </div>
          <div className={style.MenuItem}>
            <Link to={"/pieces"}>Pieces</Link>
          </div>
        </div>
        <div className={style.pageContent}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
