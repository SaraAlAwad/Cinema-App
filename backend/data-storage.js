const fs = require("fs")
const filePath= __dirname + "/data.json";

function readData(){
    console.log("reading Data");
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, "utf-8",(err, data)=>{
            if(err){
                console.log("error while reading");
                reject(err);
                return
            }
            const seats=JSON.parse(data)
            resolve(seats)
        })
    })
}
const writeData=(seatsArray)=>{
    return new Promise((resolve, reject) => {
        const seatsStr = JSON.stringify(seatsArray, null, 2) 
        fs.writeFile(filePath, seatsStr, (err) => {
            if(err) reject(err)
            else resolve(seatsArray) 
        })
    })
}
module.exports={readData, writeData}