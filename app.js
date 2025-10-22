const express = require("express")

const app = express()

app.use(express.json())

todolist = [
    {id: 1, title: "Watch movie", status: "Pending"},
    {id: 2, title: "pay bill", status: "Pending"},
    {id: 3, title: "watch tutorial series", status: "Pending"},
]

app.get("/", (req, res) => {
    res.send("Welcome to my webservice..")
})

app.get("/todo", (req, res) => {
    res.send(todolist)
})

app.post("/todo", (req, res) => {

    var req_id = req.body.id
    var req_title = req.body.title
    var req_status = req.body.status

    // var newrec = {id: 4, title: "new task", status: "Pending"}
    var newrec = {id: req_id, title: req_title, status: req_status}

    todolist.push(newrec)

    res.send(newrec)
})


app.delete("/todo/:id", (req, res) => {
    var req_id = req.params.id;

    todolist = todolist.filter(t => {
        return req_id != t.id
    })

    res.send("Deleted successfully")
})


app.put("/todo", (req, res) => {
    var req_id = req.body.id;
    var req_title = req.body.title;
    var req_status = req.body.status;

    todolist = todolist.map(t => {
        
        if(t.id == req_id) {
            t.title = req_title
            t.status = req_status
        }

        return t;

    })

    res.send("Updated successfully")
})


app.listen(3000, () => {
    console.log("Running on port 3000");
})




// console.log("Hello from node");
// console.table(todolist);
