export default function passwordValidator(pass){
    if(pass === undefined || pass === null){
        return undefined;
    }
    if(pass.length < 6 || pass.length > 32){
        return 'length';
    }
    if(!/\d/.test(pass)){
        return 'weak';
    }
    return true;
}