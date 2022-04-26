import style from "./style.module.scss";
import { useState, useEffect, useContext } from "react";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import FirstPageSharpIcon from "@mui/icons-material/FirstPageSharp";
import LastPageSharpIcon from "@mui/icons-material/LastPageSharp";
// import { Worker } from "@react-pdf-viewer/core";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
// Import styles
// import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
/////////////////////
import { Document, pdfjs, Page } from "react-pdf";
import { GlobalContext } from "../../context/GlobalState";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DisplayFile = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { pdf } = useContext(GlobalContext);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const cors = "https://cors-anywhere.herokuapp.com/";
  const url = `${cors}http://127.0.0.1:8000/files/1650623812.pdf`;
  //create instance
  //   const pageNavigationPluginInstance = pageNavigationPlugin();
  //   const goToPage = () => {
  //     pageNavigationPluginInstance.CurrentPageInput = 10;
  //     // pageNavigationPluginInstance.
  //   };
  return (
    <div className={style.displayFile}>
      <div className="h-10"></div>
      <h1>Le fichier de piece</h1>
      <div className="h-[600px] w-full">
        <Document
          file={url}
          // file={pdf}
          className="w-full h-[598px] flex justify-center items-center"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(e) => console.log(e)}
        >
          <Page
            className="w-full	flex justify-center items-center"
            // width={540}
            height={598}
            pageNumber={pageNumber}
          />
        </Document>
      </div>
      <div className="flex justify-center items-center px-2 bg-primer text-white h-[45px] relative">
        <div className="flex justify-between">
          <FirstPageSharpIcon
            onClick={() => setPageNumber(1)}
            className="cursor-pointer"
          />
          <NavigateBeforeSharpIcon
            onClick={() => setPageNumber((prev) => prev - 1)}
            className="cursor-pointer"
          />
          <NavigateNextSharpIcon
            onClick={() => setPageNumber((prev) => prev + 1)}
            className="cursor-pointer"
          />
          <LastPageSharpIcon
            onClick={() => setPageNumber(numPages)}
            className="cursor-pointer"
          />
        </div>
        <div className="absolute right-2">
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayFile;

{
  /* http://data.bimmapro.com/Circuit_diagram_legend/Circuit%20diagram%20legend%201.pdf */
}
{
  /* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
  <Viewer fileUrl={pdf} plugins={[pageNavigationPluginInstance]} />
</Worker> */
}
