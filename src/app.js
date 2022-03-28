const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view location
//by default express looks for views for folder for the handlebars,thus to change the name of folder for express to view we write the second line
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rohan Garg",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Bout",
    name: "Rohan Garg",
    city: "Mumbai",
    age: 20,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    howTo: "WE are here to help you",
    title: "help",
    name: "Rohan Garg",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address",
    });
  }
  geocode(req.query.address, (error, { lat, lng, loc } = {}) => {
    if (error) {
      console.log("1");
      return res.send({ error });
    }

    forecast(lat, lng, loc, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        loc,
        address: req.query.address,
      });
    });
  });
});
//app.com
//app.com/help
//app.com/about

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    name: "Rohan Garg",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error",
    name: "Rohan Garg",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
