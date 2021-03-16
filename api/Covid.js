const express = require("express");
const axios = require('axios')
const router = express.Router();

const getDataFromApi = async (country) => {
  const covidResponse = await axios.get(`https://covid-api.mmediagroup.fr/v1/history?status=deaths&country=${country}`)
  if (covidResponse) {
    return covidResponse
  }
}

router.get('/', async (req, res) => {
  try {
    const data = await axios.get('https://covid-api.mmediagroup.fr/v1/cases')
    res.status(200).send(data.data)
  } catch (error) {
    res.status(404).json({ nopostsfound: error.message })

  }
})


router.get('/:country', async (req, res) => {
  const searchText = req.params.country;
  try {
    const dataR = await getDataFromApi(searchText)
    res.status(200).send(dataR.data)
  } catch (error) {
    res.status(404).json({ nopostsfound: "no posts found" })

  }

})
module.exports = router;