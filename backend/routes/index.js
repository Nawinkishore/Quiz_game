import express from 'express';
import conn from '../config/db.js';
import sqlString from 'sqlstring'; 
const router =  express.Router();
router.get('/',(req,res)=>{
    // res.send("Welcome");
    let query = sqlString.format('SELECT sentence from question');
    conn.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.json({
                success:false,
                message:"There was a problem"
            });
        }
        let list = result.map(item=>item.sentence);
        return res.json({
            success:true,
            message:"successfully created",
            list,
        });
    });
})
router.get('/',(req, res)=>{
    // let query = sqlString.format('SELECT 
})
export default router;