const express = require('express');
const student = require('./routes/student_router');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json())
app.use("/api/student", student)
app.use(errorHandler)

const PORT = 3000;

app.listen( PORT, () => {
    console.log(`server running port ${PORT}`);
} )