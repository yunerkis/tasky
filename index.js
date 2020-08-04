const express = require('express')
const app = express()
const fs = require('fs')
const {Tasky:Task} = require("./tasky.js")
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let index = fs.readFile('./index.html', (error, data)=> {
    if(error){
      console.error("Couldn't read index.html", error);
      res.status(500)
      res.send("couldn't read index.html")
      return;
    }
    let indextext = data.toString('utf-8')
    res.status(200)
    res.set("Content-Type", "text/html;charset=utf-8")
    res.send(indextext)
  })
})

var tasks = [];

app.get("/tasks", (req, res) => {
    res.status(200).set("Content-Type", "application/json").send(tasks);
})


app.post("/tasks", (req, res) => {
  if (!req.body) {
      res.status(400).send("Expected a payload");
      return;
  }
  if (!req.body.startDate || !req.body.endDate || !req.body.description || !req.body.name || !req.body.state ) {
    res.status(400).send("Incomplete or invalid payloads are not accepted");
    return;
  }

  let name = req.body.start;
  let startDate = req.body.startDate;
  let description = req.body.description;
  let state = req.body.state;

  let startDate = Date.parse(start)
  let endDate = Date.parse(end)

  if(isNaN(startDate.getTime())||isNaN(endDate.getTime())){
    res.status(400).send("Invalid Date")
    return;
  }

  let state = convertState(req.body.state)
  
  var task =  new Task(name, startDate, endDate, description, state)
  tasks.push(task);
  res.status(201).set("Content-Type", "application/json").send(task);
});

app.get("/", (req, res) => res.send("Hello world!"));

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
 