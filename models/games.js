const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const GamesSchema=new Schema({
    title:{type:String,required:true}
  }
)

module.exports=mongoose.model(`Games`,GamesSchema);