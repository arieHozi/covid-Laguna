import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import LineC from "./LineChart";

const riceFilterModel = {
  items: [{ columnField: "country", operatorValue: "contains", value: "" }],
};

const columns = [
  { field: "country", headerName: "Country", width: 130 },
  { field: "confirmed", headerName: "Confirmed", width: 130 },
  { field: "recovered", headerName: "Recovered", width: 130 },
  { field: "deaths", headerName: "Deaths", width: 130 },
  { field: "population", headerName: "Population", width: 130 },
  { field: "area", headerName: "Area (in sq_km)", width: 130 },
  {
    field: "density",
    headerName: "Density (population per sq km)",
    width: 160,
  },
  { field: "updated", headerName: "Updated (in user local time)", width: 160 },
];

const DataTable = (props: any) => {
  const [dataRows, setDataRows] = useState([]);
  const [covidDeath, setCovidDeath] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = () => {
      const newArray: any = [];
      props.covidData &&
        props.covidData.map((item: any) => {
          newArray.push({
            id: Math.random() * 10000,
            country: item.country,
            confirmed: item.confirmed,
            recovered: item.recovered,
            deaths: item.deaths,
            population: item.population,
            area: item.sq_km_area,
            density: Math.floor(item.population / item.sq_km_area),
            updated: item.updated,
          });
        });
      setDataRows(newArray);
    };
    fetchData();
  }, [props.covidData]);

  const clickHandler = (e: any) => {
    setLoading(true);
    let newArray: any = [];
    axios
      .get("/api/covid/" + e.row.country)
      .then((response) => {
        Object.keys(response.data).forEach((key) => {
          const res1 = response.data[key];
          newArray.push(Object.values(res1)[10]);
        });
        setCovidDeath(newArray);
        setCountryName(e.row.country);
        setLoading(false);
      })
      .catch((err) => {
        setError("Server Error....");
      });
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={dataRows}
        columns={columns}
        pageSize={14}
        onCellClick={clickHandler}
        filterModel={riceFilterModel}
        components={{ Toolbar: GridToolbar }}
      />
      {error ? <h2>{error}</h2> : null}
      {!countryName ? <h2>Please Select Country From Table Above</h2> : ""}
      {loading ? (
        <CircularProgress />
      ) : countryName ? (
        <LineC covidDeath={covidDeath} countryName={countryName} />
      ) : null}
    </div>
  );
};

export default DataTable;
