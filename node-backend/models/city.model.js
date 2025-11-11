import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    _id: String,
    name: String
});

const City = mongoose.model("City", citySchema);
export default City;
