import { Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
function ArchivesCombobox({ archives, idArchive, setIdArchive }) {
  // const baseUrl = process.env.REACT_APP_BASE_URL;
  // //fetch les archives
  // const [archives, setArchives] = useState([]);
  // const getArchives = async () => {
  //   try {
  //     const req = await axios.get(`${baseUrl}/archive`);
  //     const data = await req.data;

  //     setArchives(() => data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getArchives();
  // }, []);

  return (
    <Select
      value={idArchive}
      className={style.selectOption}
      onChange={e => {
        setIdArchive(e.target.value);
      }}
    >
      {archives.map(a => {
        return (
          <MenuItem value={a.id} className=''>
            {a.codeArchive}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default ArchivesCombobox;
