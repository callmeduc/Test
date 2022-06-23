import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory {
    name: string;
    des: string;
}

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        des: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ICategoryModel>('Category', CategorySchema);
