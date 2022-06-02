import style from './style.module.scss';
import { useState, useEffect, useContext } from 'react';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import FirstPageSharpIcon from '@mui/icons-material/FirstPageSharp';
import LastPageSharpIcon from '@mui/icons-material/LastPageSharp';
import { Document, pdfjs, Page } from 'react-pdf';
import { GlobalContext } from '../../context/GlobalState';
import pdf from './jpeg-ou-png.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const DisplayFile = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // const { pdf } = useContext(GlobalContext);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const cors = 'https://cors-anywhere.herokuapp.com/';
  // const url = `${cors}D:/Laravel/archiveProject/public/files/1650623812.pdf`;
  const url = `${cors}https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
  //create instance
  //   const pageNavigationPluginInstance = pageNavigationPlugin();
  //   const goToPage = () => {
  //     pageNavigationPluginInstance.CurrentPageInput = 10;
  //     // pageNavigationPluginInstance.
  //   };
  return (
    <div className={style.displayFile}>
      <div className='h-10'></div>
      <h1>Le fichier de piece</h1>
      <div className='h-[600px] w-full'>
        <Document
          // file={{
          //   url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          //   // url: 'http://127.0.0.1:8000/files/1654161119.pdf',
          // }}
          file={url}
          className='w-full h-[598px] flex justify-center items-center'
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={e => console.log(e)}
        >
          <Page
            className='w-full	flex justify-center items-center'
            // width={540}
            height={598}
            pageNumber={pageNumber}
          />
        </Document>
      </div>
      <div className='flex justify-center items-center px-2 bg-primer text-white h-[45px] relative'>
        <div className='flex justify-between'>
          <FirstPageSharpIcon
            onClick={() => setPageNumber(1)}
            className='cursor-pointer'
          />
          <NavigateBeforeSharpIcon
            onClick={() => setPageNumber(prev => prev - 1)}
            className='cursor-pointer'
          />
          <NavigateNextSharpIcon
            onClick={() => setPageNumber(prev => prev + 1)}
            className='cursor-pointer'
          />
          <LastPageSharpIcon
            onClick={() => setPageNumber(numPages)}
            className='cursor-pointer'
          />
        </div>
        <div className='absolute right-2'>
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
