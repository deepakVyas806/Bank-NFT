const response_message = (res,status,success,message,data)=>{

    return res.status(status).json({success:success,message:message,payload:data})
}


export {response_message}