const express =require ("express");
const dotenv = require("dotenv")
const filePath= __dirname + "/data.json";
// const SeatsAPI= require("./cinemaSeats")
const fs = require("fs")


const cors = require("cors");
const { readData, writeData } = require("./data-storage");
const port=9000
dotenv.config()

const apiKey = process.env.API_KEY
const app=express()
app.use(cors())
app.use(express.json()) 
console.log(process.env);

app.use((req, _, next) => {
    console.log("new request –", req.method, req.url)
    next()
})

app.get("/seats",((_, res)=>{
    readData()
    .then(seatsArray => res.json(seatsArray))
    .catch(_ => res.status(500).json({ err: "Unknown error" })) 
}))

app.put("/seats/reserve", (req, res)=>{
    console.log("put method");
    const targetId =req.body.id;
    // console.log("id",targetId);
    const reserved = req.body.reserved
    console.log("reserved", reserved);
    readData()
    .then(seatsArray => {
        const reservedSeats= // create a new array to store the new seats data om it
        seatsArray && seatsArray.map((seat)=>{
            if (seat.id === targetId) {
            return{ ...seat, reserved: !seat.reserved} // overwrite the wanted seat
            }else{
                return seat
            }
        })
        return reservedSeats
    })
.then(((reservedSeats)=>writeData(reservedSeats)))
.then(((rewrittenArray)=>res.json(rewrittenArray)))
.catch(_ => res.status(500).json({ err: "Unknown error while reading or writing the data" })) 
    
})
app.listen(9000, () => console.log("Server listening on port", 9000))