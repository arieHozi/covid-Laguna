import React, { useState, useEffect } from "react";
import "./App.css";
import DataTable from "./components/CovidHomeTest";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App() {
  const [covidData, setCovidData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      let newArray: any = [];
      axios
        .get("/api/covid")
        .then((response) => {
          Object.keys(response.data).forEach((key) => {
            const res1 = response.data[key];
            newArray.push(Object.values(res1)[0]);
          });
          setCovidData(newArray);
          setLoading(true);
        })
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <CircularProgress />
      ) : (
        <DataTable covidData={covidData} useStyles={useStyles} />
      )}
    </div>
  );
}

export default App;
