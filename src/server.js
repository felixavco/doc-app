import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({msg: "Hello Express is working :D"});
})


app.listen(process.env.SERVER_PORT, () => console.log("Server Started...."));