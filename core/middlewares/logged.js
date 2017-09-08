module.exports=function(request,response,next){

    if(request.session.userId !== undefined){
        request.getUserId=request.session.userId;
        next();
    }else{
        response.writeHead(403, { 'Content-Type': 'text/html ; charset=utf-8'});
        response.end('<h1>Error 403 accés interdit</h1>')
    }    
}