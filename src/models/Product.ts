import mongoose, { Document, Schema } from 'mongoose';

export interface Product {
    name: string;
    category: string;
}

export interface ProductModel extends Product, Document {}

const ProductSchema: Schema = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ProductModel>('Product', ProductSchema);
