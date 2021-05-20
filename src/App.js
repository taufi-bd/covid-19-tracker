import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import { InfoBox } from "./components/InfoBox";
import { Map } from "./components/Map";
import { Table } from "./components/Table";
import { sortData, prettyPrintStat } from "./utils";
import "leaflet/dist/leaflet.css";
import { useStyles } from "./Styles";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [zoom, setZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/countries`)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      });
  };

  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Typography variant="h4" className={classes.title}>
          Covid-19 Tracker
        </Typography>
      </AppBar>
      <Container className={classes.mainContainer}>
        <Card className={classes.leftContainer}>
          <Container className={classes.countryDropdown}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                varient="outlined"
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>

          <Container className={classes.stats}>
            <InfoBox
              isRed
              active={casesType === "cases"}
              className="infoBox__cases"
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              total={prettyPrintStat(countryInfo.cases)}
              cases={prettyPrintStat(countryInfo.todayCases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              className="infoBox__recovered"
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              total={prettyPrintStat(countryInfo.recovered)}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
            />
            <InfoBox
              isGrey
              active={casesType === "deaths"}
              className="infoBox__deaths"
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              total={prettyPrintStat(countryInfo.deaths)}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
            />
          </Container>

          <Map
            className={classes.mapContainer}
            countries={mapCountries}
            center={mapCenter}
            zoom={zoom}
            casesType={casesType}
          />
        </Card>

        <Card>
          <CardContent className={classes.rightContainer}>
            <h2>Live cases by country</h2>
            <Table countries={tableData} value={country.value} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
