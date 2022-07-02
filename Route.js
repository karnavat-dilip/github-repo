import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import con from './index.js'
const router = express.Router()
const app = express()

router.get("/",(req,res)=>{
  res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)),"Client/build/index.html"));
});

router.get('/gloves', (req, res) => {
  con.query('SELECT * FROM gloves', (err, row, result) => {
    if (err) throw err;
    res.send(row);
  })
});
router.get('/doctor', (req, res) => {
  con.query('SELECT * FROM doctors', (err, row, result) => {
    if (err) throw err;
    res.send(row);
  })
});
router.get('/login', (req, res) => {
  console.log("This is backend api...");
  try {
          con.query('SELECT * FROM login_details', (err, row, result) => {
            res.send(row);
    })
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login/server', async (req, res) => {
  const id = req.body.Uid;
  const h = req.body.h;
  const selected = req.body.selected;
  const G_name = req.body.G_name;
  const G_size = req.body.G_size;
  const portno = req.body.portno;
  const G_items = req.body.G_items;
  const location = req.body.location;
  try {
    await con.query('INSERT INTO post_api (id,h,selected,G_name,G_size,portno,Company_name,location) VALUES (?,?,?,?,?,?,?,?)', [id, h, selected, G_name, G_size, portno, G_items, location], (err, result) => {
      if (err) throw err;
      console.log("success...");
    })
  } catch (error) {
    console.log(error)
  }
});
router.get('/get', (req, res) => {
  con.query('SELECT * FROM post_api', (err, row, result) => {
    if (err) throw err;
    res.json(row);
  });
});
export default router;