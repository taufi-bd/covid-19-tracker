import { Container } from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import { useStyles } from "../Styles";

export const Table = ({ countries }) => {
  const classes = useStyles();
  return (
    <Container className={classes.table}>
      <table>
        <tbody>
          {countries.map(({ country, cases }, index) => (
            <tr key={index} className={classes.tableRow}>
              <td className={classes.tableData}>{country}</td>
              <td>
                <strong>{numeral(cases).format("000,000")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
