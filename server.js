const express = require("express");
const bodyParser = require("body-parser");
const covid = require("./api/Covid");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5002;

app.listen(port, () => {
  console.log(`server is runing on port:${port}`);
});

app.use("/api/covid", covid);


