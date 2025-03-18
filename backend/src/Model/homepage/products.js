import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  typeofproduct:{
    type:String
  }
});

const Product = mongoose.model("Product", productSchema);

export default  Product;