const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql2")

app.use(cors())
app.use(express.json())

const dbconn = mysql.createConnection({
    host: "ciacloud.in",
    user: "tpuser",
    password: "%TGBbgt5",
    database: "tpdb"
})

dbconn.connect((err)=> {
    if(err) 
        console.log(err);
    console.log("mysql connected successfully")
})

app.post("/todo", (req, res) => {
    var todo_task = req.body.task;
    var todo_status = req.body.status;
    sql = `INSERT INTO shital_todo_task (id, task, status) VALUES (NULL, '${todo_task}', '${todo_status}')`
    dbconn.query(sql, (err, result) => {
        console.log(result)
    })
    res.send("Employee added Successfully")
})


app.get("/todo", (req, res) => {
    sql = `SELECT * FROM shital_todo_task`
    dbconn.query(sql, (err, result) => {
        res.send(result)
    })
})

app.put("/todo/:id", (req, res) => {
    var todo_id = req.params.id;
    var todo_status = req.body.status
    sql = `UPDATE shital_todo_task SET status = '${todo_status}' WHERE id = ${todo_id}`
    dbconn.query(sql, (err, result) => {
        console.log(result)
    })
    res.send("List status updated successfully")
})

app.delete("/todo/:id", (req, res) => {
    var todo_id = req.params.id;
    sql = `DELETE FROM shital_todo_task WHERE id = ${todo_id}`
    dbconn.query(sql, (err, result) => {
        console.log(result)
    })
    res.send("task deleted successfully");
})

app.listen(3000, () => {
    console.log("server running on port 3000");
    
})