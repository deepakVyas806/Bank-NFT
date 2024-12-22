import mongoose from 'mongoose';

const user_task_schema = new mongoose.Schema({
    
    taskId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"task"
    },
 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_register"
    },

    buy:{
        type:Boolean,
        default:false
    },

    sell:{
       type:Boolean,
       default:false
    },

    createdAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    },
    updatedAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    }
})

user_task_schema.pre("save",function(next){
    this.updatedAt = Math.floor(Date.now/1000);
    next();
})

export const user_task_model = mongoose.model('userTask',user_task_schema)