
import { model, models, Schema } from "mongoose";
import { type } from "os";


const UseSchema = Schema({
    url: {type: String},
    descricao: {type: String},
   

})

const User = models.User || model("User",UseSchema)

export default User;