const methods=["body","params","headers","query"];

const validation=(schema)=>{
let validationArray=[];
    return (req,res,next)=>{
        methods.forEach((key)=>{
            if(schema[key]){
                const validationResult =schema[key].validate(req[key],{
                    abortEarly:false,
                });
                if(validationResult?.error?.details){
                    validationArray.push(validationResult.error.details);
                }
            }
        });
       if(validationArray.length>0){
        res.json({message:"Validation error",err:validationArray});
        validationArray=[];
       }
       else{
        next();
       }
    }
}


module.exports={validation}