import express from 'express';
import cors from 'cors';

const app = express();

app
    .use(cors())
    .get('/api/users/all', (req, res) => {
        console.log('sucess');
        res.status(200).send({message: 'success'});
    })
    .listen(3000, () => {
    console.log('listening on port 3000');
})
