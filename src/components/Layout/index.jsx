import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ExtensionIcon from '@mui/icons-material/Extension';
import GridOnIcon from '@mui/icons-material/GridOn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import { GlobalContext } from '../../context/GlobalState';
function Layout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const [resize, setResize] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1280);
  const [cursorPositionX, setCursorPositionX] = useState(null);
  const [hideVerticalMenu, setHideVerticalMenu] = useState(true);
  const { user, auth } = useContext(GlobalContext);

  const verticalMenu = useRef();
  const pageContent = useRef();
  useEffect(
    // () => setCursorPositionX(() => verticalMenu.current.offsetWidth),
    () => setCursorPositionX(200),
    // console.log(window.screen.width),
    []
  );

  const stopResize = e => {
    setResize(false);
    window.getSelection()?.removeAllRanges();
    window.getSelection().empty();
  };
  const handelMouseMove = e => {
    e.stopPropagation();
    window.getSelection()?.removeAllRanges();
    window.getSelection().empty();
    console.log(e.screenX);
    if (e.screenX <= 40 || e.screenX >= 300) {
      stopResize();
    } else {
      setCursorPositionX(e.screenX);
    }
  };
  useEffect(() => {
    if (resize) {
      document.addEventListener('mousemove', handelMouseMove);
      document.addEventListener('mouseup', stopResize);
    }
    return () => {
      document.removeEventListener('mousemove', handelMouseMove);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [resize]);

  return (
    <div className={style.layout}>
      <div className={style.navbar}>
        <div className={style.logo}>Logo</div>
        <nav className={style.nav}>
          <Link className={style.link} to='login'>
            Connexion
          </Link>
          <MenuIcon
            className={style.menuIcon}
            onClick={() => setHideVerticalMenu(prev => !prev)}
          />
        </nav>
      </div>
      <div className={style.pageWrapper}>
        <div
          style={{
            width: cursorPositionX != null ? `${cursorPositionX}px` : '',
          }}
          className={`${style.verticalMenu} ${
            hideVerticalMenu ? style.hideVerticalMenu : ''
          }`}
          ref={verticalMenu}
        >
          <div
            className={resize ? style.hideVertMenu : style.showVertMenu}
          ></div>

          <Link
            to={'/archive'}
            className={cursorPositionX >= 153 ? style.MenuItem : style.MenuIcon}
          >
            <ApartmentIcon />
            {cursorPositionX >= 153 ? <p>Locaux & Services</p> : ''}
          </Link>
          <Link
            to={'/beneficiere'}
            className={cursorPositionX >= 153 ? style.MenuItem : style.MenuIcon}
          >
            <SupervisedUserCircleIcon />
            {cursorPositionX >= 153 ? <p>Beneficiaires</p> : ''}
          </Link>
          <Link
            to={'/Rangers'}
            className={cursorPositionX >= 153 ? style.MenuItem : style.MenuIcon}
          >
            <GridOnIcon />
            {cursorPositionX >= 153 ? <p>Rangers</p> : ''}
          </Link>
          <div className={`border-b border-white`}>
            <div
              onClick={() => setCollapse(prev => !prev)}
              className={`${
                style.arrowUpDawnHover
              } text-white cursor-pointer h-[60px] flex items-center px-[5px] 
              ${cursorPositionX >= 153 ? 'justify-between' : 'justify-center'}`}
            >
              <div className={`flex h-full items-center`}>
                <FolderCopyIcon />
                {cursorPositionX >= 153 ? (
                  <p className='pl-[5px]'>Dossiers</p>
                ) : (
                  ''
                )}
              </div>
              {cursorPositionX >= 153 && (
                <div className={style.arrowUpDawn}>
                  {collapse ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )}
                </div>
              )}
            </div>
            <div
              className={`${style.items} ${
                collapse ? style.collapse : style.close
              } flex flex-col justify-start	text-white`}
            >
              <Link to={'/dossiers'} className='pl-2 py-1'>
                Mise a jour
              </Link>
              <Link to={'/dossiers/pieces-fornis'} className='pl-2 py-1'>
                Pieces fornis
              </Link>
              <Link to={'/dossiers/pieces-manquants'} className='pl-2 py-1'>
                Pieces manquants
              </Link>
            </div>
          </div>
          <Link
            to={'/pieces'}
            className={cursorPositionX >= 153 ? style.MenuItem : style.MenuIcon}
          >
            <ExtensionIcon />
            {cursorPositionX >= 153 ? <p>Pieces</p> : ''}
          </Link>

          {/* {auth && user?.isAdmin == 1 && ( */}
            <Link
              to={'/utilisateurs'}
              className={
                cursorPositionX >= 153 ? style.MenuItem : style.MenuIcon
              }
            >
              <ManageAccountsIcon />
              {cursorPositionX >= 153 ? <p>Utilisateurs</p> : ''}
            </Link>
          {/* )} */}
        </div>

        <div
          className={style.resizePage}
          onMouseDown={() => setResize(true)}
          // onMouseUp={() => setResize(false)}
        ></div>
        <div ref={pageContent} className={style.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
