import express from 'express';
import conn from '../config/db.js';
import sqlString from 'sqlstring'; 
const router =  express.Router();

router.get('/', async (req, res) => {
    try {
        const query = sqlString.format('SELECT * FROM question');
        const questions = await new Promise((resolve, reject) => {
            conn.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    reject({
                        success: false,
                        message: "There was a problem"
                    });
                }
                resolve(result);
            });
        });

        const questionPromises = questions.map(async (question) => {
            const optionQuery = sqlString.format(
                `SELECT * FROM questionoption WHERE questionId = ${question.questionId}`
            );

            try {
                const options = await new Promise((resolve, reject) => {
                    conn.query(optionQuery, (err, result) => {
                        if (err) {
                            reject({
                                success: false,
                                message: "There was a problem"
                            });
                        }
                        resolve(result);
                    });
                });

                question.options = options;
                return question;
            } catch (error) {
                throw error;
            }
        });

        const updatedQuestions = await Promise.all(questionPromises);

        return res.json({
            success: true,
            questions: updatedQuestions
        });
    } catch (error) {
        return res.json(error);
    }
});

router.get('/',(req, res)=>{
    // let query = sqlString.format('SELECT 
})
export default router;
