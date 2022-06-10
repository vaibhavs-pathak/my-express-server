import "dotenv/config";
const path = require("path");
const express = require("express");
const handleError = require("./controllers/errorHandler");
const awsRoutes = require("./routes/aws-routing");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(awsRoutes);

app.use(handleError);

app.listen(3000);
