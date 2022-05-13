const express = require('express');
const student_controller = require('../controllers/student_controller');
const student = express.Router()

student.route("/")
   .get( student_controller.get_all_student )
   .post( student_controller.register_student )


module.exports = student