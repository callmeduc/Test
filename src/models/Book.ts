import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    name: string;
    author: string;
    category: string;
    des: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
        des: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);
