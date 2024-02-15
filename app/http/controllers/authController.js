function authController(){
    //factory function - function jo object return krta h
    return{
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
        }
    }
}

module.exports = authController