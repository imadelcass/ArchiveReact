import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const Columns = () => {
  const { refTypeDoss, refServices, refBenefs, refCellules, refUsers } =
    useContext(GlobalContext);

  const extractValues = (mappings) => {
    return Object.keys(mappings);
  };

  const columns = [
    {
      field: "NUMDOSSIER",
      headerName: "Num",
    },
    {
      field: "IDTYPEDOSSIER",
      headerName: "Type",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: extractValues(refTypeDoss),
      },
      refData: refTypeDoss,
    },
    {
      field: "IDSERVICE",
      headerName: "Service",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: extractValues(refServices),
      },
      refData: refServices,
    },
    {
      field: "IDBENEFICIAIRE",
      headerName: "Beneficiaire",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: extractValues(refBenefs),
      },
      refData: refBenefs,
    },
    // {
    //   field: "DATEDOSSIER",
    //   headerName: "Date",
    // },
    // {
    //   field: "idCellule",
    //   headerName: "Cellule",
    //   cellEditor: "agSelectCellEditor",
    //   cellEditorParams: {
    //     values: extractValues(refCellules),
    //   },
    //   refData: refCellules,
    // },
    {
      field: "AnneeDossier",
      headerName: "Annee",
    },
    // {
    //   field: "ObjetDossier",
    //   headerName: "Objet",
    // },
    // {
    //   field: "DISPODOSSIER",
    //   headerName: "Disponible",
    //   cellEditor: "agSelectCellEditor",
    //   cellEditorParams: {
    //     values: [0, 1],
    //   },
    //   refData: {
    //     0: "none",
    //     1: "oui",
    //   },
    // },
    // {
    //   field: "VALID",
    //   headerName: "Valider",
    //   cellEditor: "agSelectCellEditor",
    //   cellEditorParams: {
    //     values: [0, 1],
    //   },
    //   refData: {
    //     0: "none",
    //     1: "oui",
    //   },
    // },
    // {
    //   field: "VALIDPAR",
    //   headerName: "Valider Par",
    //   cellEditor: "agSelectCellEditor",
    //   cellEditorParams: {
    //     values: extractValues(refUsers),
    //   },
    //   refData: refUsers,
    // },
    // {
    //   headerName: "Action",
    //   editable: false,
    //   filter: false,
    //   headerClass: "actionHeaderCol",
    //   cellRenderer: (props) => (
    //     <ActionCell
    //       props={props}
    //       gridRef={gridRef}
    //       dateEditDoss={dateEditDoss}
    //     />
    //   ),
    // },
  ];
  return columns;
};

export default Columns;
