import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import AxiosConfig from "../../AxiosConfig";
import { useEffect, useState } from "react";

// import { Cellules } from "./fetchData";
const CellulesSelect = ({ cellule, setCellule }) => {
  const axios = AxiosConfig();
  const [cellules, setCellules] = useState([]);
  const getCellules = async () => {
    try {
      const req = await axios.get(`/cellules`);
      const data = await req.data;
      setCellules(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCellules();
  }, []);

  return (
    <Autocomplete
      size="small"
      onChange={(e, newVal) => setCellule(newVal)}
      // className="pt-3"
      disablePortal
      id="combo-box-demo"
      options={cellules}
      getOptionLabel={(option) => option.codeCellule}
      renderInput={(params) => <TextField {...params} label="" />}
    />
  );
};
// const StyledAutocomplete = styled(Autocomplete)({
//   "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
//     height : 30,
//     padding : 0,
//   },
//   "& .MuiAutocomplete-inputRoot": {
//     backgroundColor: 'aliceblue',
//     height : 40,
//     padding : 0,
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//         height : 30,
//         padding : 0,
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//         height : 30,
//         padding : 0,
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//         height : 30,
//         padding : 0,
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//         height : 30,
//         padding : 0,
//     },
//   },
// });

//  .MuiOutlinedInput-root.MuiInputBase-sizeSmall
export default CellulesSelect;
