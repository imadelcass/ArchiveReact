import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";

const usePrint = (
  componentRef,
  printIcon,
  setPrintIcon,
  content,
  setContent
) => {
  //   setPrintIcon(false);
  console.log(componentRef.current);
  useEffect(() => {
    setContent(componentRef.current);
    console.log(content);
  }, [componentRef]);
//   console.log(content);
  const handlePrint = useReactToPrint({
    content: content,
    // onAfterPrint: () => setPrintIcon(true),
  });
  return handlePrint;
};

export default usePrint;
