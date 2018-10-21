module.exports = function(error, req, res, next){
    //Loging error
    res.status(500).send('Somthing faild.');
}