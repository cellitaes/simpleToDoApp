import React from 'react';
import ReactDOM from 'react-dom';

const express = require("express");
const path = require("path");


ReactDOM.render(<App />, document.getElementById('root'));


const app = express();

app.use(express.json());
app.use(express.static(
    path.join(__dirname, "public"),
));

app.listen(3000, () => {
    console.log("Sever is listening at http://localhost:3000/");
})


app.get('/', (res, req) => {

});