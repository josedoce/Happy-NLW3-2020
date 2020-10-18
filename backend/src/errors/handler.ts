import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

//capiturando erro da validadeção dos campos com yup
interface ValidationErrors{
    [key: string]: string[];
}
//capiturando erro da validadeção dos campos com yup
const errorHandler: ErrorRequestHandler = (error, request, response, next) =>{
    //capiturando erro da validadeção dos campos com yup
    if(error instanceof ValidationError){
        let errors: ValidationErrors = {};

        error.inner.forEach(err=>{
            errors[err.path] = err.errors;
        })
    }
    //capiturando erro da validadeção dos campos com yup
    console.error(error);
    return response.status(500).json({message: 'Internal server error'});
};

export default errorHandler;