module.exports=function(request,response,next){

    if(request.session.flash !== undefined){
        response.locals.flash=request.session.flash;
        request.session.flash=undefined;
    }
    
    request.setFlash=function(type,msg){
        if(request.session.flash === undefined){
            request.session.flash={};
        }
        request.session.flash={'type':type,'msg':msg};
    }

    next();
}