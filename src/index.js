import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const KEY = process.env.KEY

const objectToArray = obj => {
   const keys = Object.keys(obj);
   const res = [];
   for(let i = 0; i < keys.length; i++){
      res.push(obj[keys[i]]);
   };
   return res;
};

app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-req.d-With, Content-Type, Accept"
  );
  next();
});

app.get('/api/News', async (req, res) => {
    const url = 'https://api.hypixel.net/skyblock/news?key=' + KEY
  const response = await axios.get(url);
  const results = JSON.stringify(response.data);
  res.send(results)
})

app.get('/api/status/:id', async (req, res) => {
    try {
    let finaluuid = ''
    const uuid = await axios.get("https://api.mojang.com/users/profiles/minecraft/" + req.params.id)
    const uuidjson = uuid.data
    finaluuid = uuidjson["id"]
    const url = 'https://api.hypixel.net/status?key=' + KEY + "&uuid=" + finaluuid
  const response = await axios.get(url);
  const results = JSON.stringify(response.data);
  res.send(results);
    }catch(err) {
        res.send(`{"error": true}`);
    }
})

app.get('/api/profile/:id/:profile', async (req,res)=>{
    try {
    let finaluuid = ''
    const uuid = await axios.get("https://api.mojang.com/users/profiles/minecraft/" + req.params.id)
    const uuidjson = uuid.data
    finaluuid = uuidjson["id"]
    const url = 'https://api.hypixel.net/skyblock/profile?key=' + KEY + "&uuid=" + finaluuid + "&profile=" + req.params.profile 
  const response = await axios.get(url);
  const results = JSON.stringify(response.data);
  res.send(results);
    }catch(err) {
        res.send(`{"error": true}`);
    }
})

app.get('/api/status', (req,res)=>{
    res.send(`{"error": true}`);
})
app.get('/api/profiles/', (req,res)=>{
    res.send(`{"error": true}`);
})
app.get('/api/profileslist/', (req,res)=>{
    res.send(`{"error": true}`);
})

app.get('/api/ahplayer/:id/:profile', async (req,res)=>{
    try {
    let finaluuid = ''
    const uuid = await axios.get("https://api.mojang.com/users/profiles/minecraft/" + req.params.id)
    const uuidjson = uuid.data
    finaluuid = uuidjson["id"]
    const url = 'https://api.hypixel.net/skyblock/auction?key=' + KEY + "&uuid=" + finaluuid + "&profile=" + req.params.profile
  const response = await axios.get(url);
  const results = JSON.stringify(response.data);
  res.send(results );
    }catch(err) {
        res.send(`{"error": true}`);
    }
})

app.get('/api/profilelist/:id', async (req,res)=>{
    try {
    let finaluuid = ''
    const uuid = await axios.get("https://api.mojang.com/users/profiles/minecraft/" + req.params.id)
    const uuidjson = uuid.data
    finaluuid = uuidjson["id"]
    const url = 'https://api.hypixel.net/player?key=' + KEY + "&uuid=" + finaluuid 
  const response = await axios.get(url);
  const notdone = response.data;
    const results = JSON.stringify(objectToArray(notdone["player"]["stats"]["SkyBlock"]["profiles"]))
  res.send(results);
    }catch(err) {
        res.send(`{"error": true}`);
    }
})

app.get('/api/fetchuuid/:id', async (req,res)=>{
    const uuid = await axios.get("https://api.mojang.com/users/profiles/minecraft/" + req.params.id)
    const uuidsearcher = uuid.data
    const stringfinall = JSON.stringify(uuidsearcher)
    res.send(stringfinall)
})

app.get('*', (req,res) =>{
    res.send('404 not found your mum 🙃')
})
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})


