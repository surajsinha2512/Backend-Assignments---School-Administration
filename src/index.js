const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let studentArr = require("./InitialData");
const studentArray = require("./InitialData");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
let maxId = studentArr.length;
app.get("/api/student", (req, res) => {
  res.send(studentArr);
});
app.get("/api/student/:id", (req, res) => {
    const idToSearch=req.params.id
    const matched=studentArray.filter((student)=>student.id===Number(idToSearch))
    if(matched.length===0){
        res.sendStatus(404)
    }else{
        res.send(matched[0])
    }
  });
  const isNullOrUndefined=(val)=>val===null|| val===undefined;
  app.post('/api/student',(req,res)=>{
      const newStudent=req.body
      const {name,currentClass,division}=newStudent
      if(isNullOrUndefined(name)||isNullOrUndefined(currentClass)||isNullOrUndefined(division)){
          res.sendStatus(404)
      }else{
          const newId=maxId+1
          maxId=newId
          newStudent.id=newId
          newStudent.currentClass=Number(currentClass)
          studentArray.push(newStudent)
          res.send({id:newId})

        }
  })
  app.put('/api/student/:id',(req,res)=>{
    const idToSearch=req.params.id
    const update=req.body
    const {name,currentClass,division}=update
    const matchedIdx=studentArray.findIndex((student)=>student.id===Number(idToSearch))
    if(matchedIdx===-1){
        res.sendStatus(400)
    }
    else{
        if(
            isNullOrUndefined(name) && 
            isNullOrUndefined(currentClass) && 
            isNullOrUndefined(division)){
            res.sendStatus(400)
        }
        else{
            if(!isNullOrUndefined(name)){
                studentArray[matchedIdx].name=name
            }
            if(!isNullOrUndefined(currentClass)){
            studentArray[matchedIdx].currentClass=Number(currentClass)
           }
           if(!isNullOrUndefined(division)){
            studentArray[matchedIdx].division=division
        }
        res.sendStatus(200)
        }
    }
  })
  app.delete('/api/student/:id',(req,res)=>{
    const idToSearch=req.params.id
    const matchedIdx=studentArray.findIndex((student)=>student.id===Number(idToSearch))
    if(matchedIdx===-1){
        res.sendStatus(404)
    }else{
        studentArray.splice(matchedIdx,1)
        res.sendStatus(200);
    }

  })


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app; 