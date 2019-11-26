// one file to change all the values
export default global = {
    dbUrl : 'mongodb://@localhost:27017/taskManager',
    port : '8001',
    token : {
        secretkey : 'aKroKeydile',
        expiration : '36000s'
    },
    whitelist : ['http://localhost:4200']
}