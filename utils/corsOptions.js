import value from './globalValue';

export const corsOptionsDelegate = (req, callback) => {

const whitelist = value.whitelist;
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
        console.log('CORS DENIED --- '+req.header('Origin')+' --- IS NOT ON THE WHITELIST')
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}