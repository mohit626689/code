import mongooes from "mongooes";

const userSchema = new mongooes.schema({
    name: {
        type :String,
        trim :true,
    }
    email:{
        type :String,
        trim : true,
        lowercase : true,
    }
    image :{
        type : String,
    },
   boards: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
],
})
export default mongoose.models.User || mongoose.model("User", userSchema);