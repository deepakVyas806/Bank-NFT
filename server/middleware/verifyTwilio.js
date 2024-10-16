// const verifyTwilio = (req,res,next)=>{
//     try {
//         if(!req.session.success){
//             return res.status(500).json({success:false,message:'otp is not verifed yet'})
//         }
//         const verfiy_data = {
//             otp:req.session.Details.otp,
//             sessionDetails:req.session.Details

//         }
//        req.Details = verfiy_data;
//        return next();

//     } catch (error) {
//          return res.status(500).json({success:false,message:"cat error in verify twilio otp",error:error.message})
//     }
//      res.json({message:'session in regioster',session:req.session});
// }

// export {verifyTwilio}
