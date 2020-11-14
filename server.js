//create server

//adding listener for port

//create the routes to load html files

//create post scripts to display wait list and table link


// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = []

var waitlist = []

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all characters
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


app.get("/api/get-reservations", function(req, res) {
    if (reservations.length != 0) {
        return res.json(reservations);
    }
    else {
        return res.json(false);
    }
});


app.get("/api/get-waitlist", function(req, res) {
    if (waitlist.length != 0) {
        return res.json(waitlist);
    }
    else {
        return res.json(false);
    }
});

app.post("/api/save-reservation", function(req,res) {
    var newReservation = req.body

    if (reservations.length < 6) {
        reservations.push(newReservation)
    }
    else {
        waitlist.push(newReservation)
    }

})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
