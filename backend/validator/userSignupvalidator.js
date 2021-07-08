import emailValidator from "../helpers/emailValidator.js";
import passwordValidator from "../helpers/passwordValidator.js";

export function userSignupvalidator (data) {
    return new Promise(function (resolve,reject){
        //Email
        let result = emailValidator(data.email);
        if(result === undefined){
            reject('Email address is required');
            return;
        }
        if(result === 'length'){
            reject('Email must be between 3 to 32 characters');
            return;
        }
        if(result === false){
            reject('Email address not valid')
            return;
        }
        if(data.name === undefined || data.name === null){
            reject('Name is required');
            return;
        }
        if(data.name.length <3 || data.name.length > 32){
            reject('Name should be between 3 and 32 characters')
            return;
        }
        result = passwordValidator(data.password);
        if(result === undefined){
            reject('Password is required');
            return;
        }
        if(result === 'length'){
            reject('Password must be between 3 to 32 characters');
            return;
        }
        if(result === 'weak'){
            reject('Password is weak');
            return;
        }
        resolve('Success')
    });
}