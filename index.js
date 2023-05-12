// require the library
const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const Task = require("./models/list");
// const jsdom = require("jsdom");
const ejs = require("ejs");
// const cheerio = require("cheerio");

// Render the EJS file and retrieve the resulting HTML

// Use Cheerio to parse the HTML and extract the <li> elements
//  set-up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.static("./assets"));
// app.use('/', require('./routes/index'));

var lists = [
  {
    description: "get vegitable",
    category: " personal",
    due_date: "11/11/1997",
  },
  {
    description: "get milk",
    category: " work",
    due_date: "11/11/2020",
  },
];
var html;
var $;
var newTasks;
app.get("/", function (req, res) {
  Task.find().then((newTask) => {
    newTasks = newTask;

    // liElements.each(function (index, element) {
    //   console.log($(this).text());
    // });

    return res.render("home", {
      title: "TODO App",
      task_list: newTask,
      //         // moment : moment
    });
  });
 
});
//  for add task
app.post("/create-task", function (req, res) {
  Task.create({
    description: req.body.description,
    category: req.body.category,
    due_date: req.body.dueDate,
  })
    .then((newTask) => {
      //   console.log("**********", newTask, req);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("error in creating a contract!", err);
    });
});


// for deleting
app.post("/delete-task", function (req, res) {
  const selectedTasks = req.body.selectedTasks;
  Task.deleteMany({ _id: { $in: selectedTasks } })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in deleting the selected tasks");
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
});


// app.get("/delete-all-task", function (req, res) {
//   Task.remove({}, function (err) {
//     if (err) {
//       console.log("Error in deleting all task.");
//       return;
//     }
//     return res.redirect("back");
//   });
// });

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
  }
  console.log("Yup! My Express Server is running in port :", port);
});
