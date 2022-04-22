import style from "./style.module.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useContext, useState } from "react";
import axios from "axios";
import { AlertContext } from "../../context/AlertContext";
import { useDropzone } from "react-dropzone";
const NewPage = ({ pieces }) => {
  const { setAlert } = useContext(AlertContext);
  const [numPage, setNumPage] = useState(null);
  const [piece, setPiece] = useState(null);
  const [image, setImage] = useState(undefined);

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     setImage(
  //       acceptedFiles.map((file) => ({
  //         file: file,
  //         display: URL.createObjectURL(file),
  //       }))
  //     );
  //   },
  // });

  const onFileChange = (e) => {
    setImage({
      file: e.target.files[0],
      display: URL.createObjectURL(e.target.files[0]),
    });
  };
  const addNewPage = async () => {
    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("numPage", numPage);
    formData.append("idPiece", piece.id);
    try {
      const req = await axios.post("/page_piece/add", formData);
      const data = await req.data;
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

  return (
    <div className={style.newPage}>
      <div className="h-10"></div>
      <h1>Ajouter une page</h1>
      <div className={style.fields}>
        <div className={style.field}>
          <label>Numéro du page</label>
          <input
            className={style.input}
            type="number"
            min="0"
            value={numPage}
            onChange={(e) => setNumPage(e.target.value)}
          />
        </div>
        <div className={style.field}>
          <label>Piece</label>
          <Select
            options={pieces}
            className={style.select}
            getOptionLabel={(piece) => piece.intitulePiece}
            getOptionValue={(piece) => piece.id}
            value={piece}
            onChange={(e) => setPiece(e.valueOf())}
          />
        </div>
        <div className={style.field}>
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            hidden
            id="page_photo"
            onChange={(e) => onFileChange(e)}
          />
          <label className={style.page_photo} htmlFor="page_photo">
            <CloudUploadOutlinedIcon className={style.uploadIcon} />
          </label>
        </div>

        {/* {image != undefined && (
          <div {...getRootProps()} className="h-[400px] border border-gray-900">
            <input {...getInputProps()} />
            <img
              className="h-full w-full object-cover"
              src={image[0]?.display}
            />
          </div>
        )} */}

        {image != undefined && (
          <div className="h-[400px]">
            <img className="h-full w-full object-cover" src={image?.display} />
          </div>
        )}
        <button
          onClick={() => addNewPage()}
          className="bg-primer text-white h-[45px] w-full mt-2"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default NewPage;
