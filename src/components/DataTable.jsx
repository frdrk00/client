import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultTheme = createTheme();

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <ThemeProvider theme={defaultTheme}>
        <MaterialTable
          data={data}
          columns={columns}
          title={title}
          actions={actions}
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
