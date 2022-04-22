import style from "./style.module.scss";
import pdf from "./test.pdf";
import { useState, useEffect } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
// Import styles
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

/////////////////////
import { Document, Page } from "react-pdf";

const DisplayFile = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
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
      {/* <button onClick={() => goToPage()}>Click</button> */}
      {/* http://data.bimmapro.com/Circuit_diagram_legend/Circuit%20diagram%20legend%201.pdf */}
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Viewer fileUrl={pdf} plugins={[pageNavigationPluginInstance]} />
      </Worker> */}
      <Document
        file={
          "http://data.bimmapro.com/Circuit_diagram_legend/Circuit%20diagram%20legend%201.pdf"
        }
        options={{ workerSrc: "/pdf.worker.js" }}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default DisplayFile;
