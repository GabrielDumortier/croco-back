import mongoose from 'mongoose';
import value from './globalValue';

//modifier l'url de la db le moment venu
const dbUrl = value.dbUrl;

export const connect = (url=dbUrl,opts = {})=>{
    return mongoose.connect(
        url,
        {...opts,useNewUrlParser:true, useUnifiedTopology: true}
    )
}