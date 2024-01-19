import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/status',(req,res)=>{
    res.send("Server responded");
})
app.use('/api', router);
app.listen(5000,() => {
    console.log('listening on port');
});