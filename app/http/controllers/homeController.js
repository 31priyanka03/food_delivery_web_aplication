const Menu = require('../../models/menu')
function homeController(){
    //factory function - function jo object return krta h
    return{
        async index(req,res){
            const food= await Menu.find()
                return res.render('home',{food:food})
            }
        }
    }


module.exports = homeController