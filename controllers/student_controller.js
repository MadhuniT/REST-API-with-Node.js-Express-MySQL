const conn = require("../services/db")
const AppError = require("../utils/AppError")
const { isEmpty } = require("../utils/is_empty")
const joi = require('@hapi/joi')
const { REGISTER_STUDENT } = require("../queries/queries")

const student_model = joi.object({
    name:joi.string().min(3).max(100).required(),
    age:joi.number().required().integer(),
    email:joi.string(),
    password:joi.string()
})

// get all students
exports.get_all_student = ( req, res, next) => {
    conn.query( "SELECT * FROM students", ( err, data, field ) => {
        res.status(200).json({
            data: data
        })
    })
}

// regiser student
exports.register_student = ( req, res, next ) => {
    if( isEmpty(req.body) ) return next( new AppError("No form data found",400) )
    
    const student_data = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    }
    try{
        const { error } = student_model.validate( student_data );
        if( error ) return next( new AppError( error.details[0].message, 400 ))

        conn.query( REGISTER_STUDENT, [student_data.email], ( err,data,fields )=>{
            if( err ) return next( new AppError( err,500 ))
            if( data.length ) return next( new AppError( "Email already used", 401 ))
        } )
    } catch( err ){
        return next( new AppError( err,500 ) )
    }

}
