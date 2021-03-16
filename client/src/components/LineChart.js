import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import Typography from '@material-ui/core/Typography';

const LineC = ({ covidDeath, countryName }) => {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const getChartData = () => {
      const newArray = [];
      covidDeath &&
        covidDeath.map(item => (
          Object.keys(item).forEach((key) => {
            newArray.push({
              date: key,
              deaths: item[key]
            })
          })
        ))
      setChartData(newArray)
    }
    getChartData()
  }, [covidDeath])


  return (
    <>
      <Typography variant="h4" component="h2" color="primary" align='center'>Covid Deaths Per Date For : {countryName}</Typography>
      <LineChart width={1200} height={400} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="deaths" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey='date' />
        <YAxis dataKey='deaths' />
        <Tooltip />
      </LineChart>
    </>
  )
}

export default LineC
