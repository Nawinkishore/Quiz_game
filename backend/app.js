import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/status',(res,req)=>{
    res.send("Server responded");
})
app.listen(5000,() => {
    console.log('listening on port');
});