// import 'handsontable/dist/handsontable.full.css';
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
registerAllModules();
const hotData = [
  ["", "Tesla", "Volvo", "Toyota", "Honda"],
  ["2020", 10, 11, 12, 13],
  ["2021", 20, 11, 14, 13],
  ["2022", 30, 15, 12, 13],
];

function Home() {
  return (
    <HotTable
      data={hotData}
      colHeaders={true}
      rowHeaders={true}
      width="600"
      height="300"
    />
  );
}
export default Home;
