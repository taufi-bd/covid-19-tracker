import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    padding: "12px",
    display: "flex",
    justifyContent: "center",
  },

  mainContainer: {
    marginTop: "100px",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  leftContainer: {
    flexGrow: "1",
    marginRight: "15px",
  },

  countryDropdown: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0",
  },

  stats: {
    display: "flex",
  },

  mapContainer: {
    marginTop: "15px",
  },

  rightContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
  },

  table: {
    overflow: "scroll",
    height: "70vh",
    color: "#0D47A1",
    marginTop: "10px",
  },

  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "8px",
    backgroundColor: "white",
    "&:nth-of-type(odd)": {
      backgroundColor: "#f3f2f8",
    },
  },

  tableData: {
    padding: "0.5rem",
  },
}));
