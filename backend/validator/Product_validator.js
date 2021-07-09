export function Product_validator(fields,files){
    return new Promise((resolve, reject) => {
        if(fields.name === undefined || fields.name.length < 4){
            return reject('Name is required');
        }
        if(fields.description === undefined || fields.description.length < 6){
            return reject('Description is required')
        }
        if(fields.price === undefined || fields.price < 1){
            return reject('Price is required');
        }
        if(fields.quantity === undefined || fields.quantity < 0){
            return reject('Quantity is required');
        }
        if(fields.shipping === undefined){
            return reject('Shipping field is required');
        }
        // Image Validation
        if(files.photo === undefined || files.photo.name.length < 4){
            return reject('Image is not valid');
        }
        if(files.photo.size > 1000000){
            return reject('Image size should be less then 1 M.B');
        }
        resolve('Success');
    });
}