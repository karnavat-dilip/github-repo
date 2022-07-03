import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import router from './Route.js';
import mysql from 'mysql'
import path from 'path'
import {fileURLToPath} from 'url'
import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config()
const Pool = pg.Pool
const app = express()
const port = process.env.PORT || 9898;

// var con = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "pgsql",
//   database:"postgres",
//   port:5432
// });
// console.log(typeof con);

const devconfig=`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
const proconfig=process.env.DATABASE_URL;
const con = new Pool({
  connectionString:process.env.NODE_ENV==="production"?proconfig:devconfig
  // ssl:true
})
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully!");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "Client/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)),"Client/build/index.html"));
  })
}
console.log('!!!',path.join(path.dirname(fileURLToPath(import.meta.url)), "Client/build"));
// console.log(__dirname);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('*',router)

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
// console.log(__dirname);

export default con
