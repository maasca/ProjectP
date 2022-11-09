const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const { success, getUniqueId } = require("./helper.js");
let parkings = require("./mock-parkings");
let reservations = require("./reservations");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(express.json());

app.get("/", (req, res) => res.send("Hello, Express	!"));

app.get("/api/parkings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const parking = parkings.find((parking) => parking.id === id);
  const message = "Un parking a bien été trouvé";
  res.json(success(message, parking));
});

app.get("/api/parkings", (req, res) => {
  const message = "La liste des parkings a bien été récupérée";
  res.json(success(message, parkings));
});

app.get("/api/parkings/:parkingId/reservations", (req, res) => {
  const parkingId = parseInt(req.params.parkingId);
  const resa = [
    reservations.filter((reservations) => reservations.parkingId === parkingId),
  ];
  const message = `La liste des réservations du parking ${parkingId} a bien été récupérée`;
  res.json(success(message, resa));
});

app.post("/api/parkings", (req, res) => {
  const id = getUniqueId(parkings);
  const parkingCreated = { ...req.body, ...{ id: id, created: new Date() } };
  parkings.push(parkingCreated);
  const message = "le parking : " + parkingCreated.name + " a bien été créé";
  res.json(success(message, parkingCreated));
});

app.put("/api/parkings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const parkingUpdated = { ...req.body, id: id };
  parkings = parkings.map((parking) => {
    return parking.id === id ? parkingUpdated : parking;
  });
  const message = "Le parking : " + parkingUpdated.name + " a bien été modifié";
  res.json(success(message, parkingUpdated));
});

app.delete("/api/parkings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const parkingDeleted = parkings.find((parking) => parking.id === id);
  parkings = parkings.filter((parking) => parking.id !== id);
  const message = `Le parking ${parkingDeleted.name} a bien été supprimé.`;
  res.json(success(message, parkingDeleted));
});

app.listen(port, () =>
  console.log(`Notre application est démarrée sur : http://localhost:${port}`)
);
