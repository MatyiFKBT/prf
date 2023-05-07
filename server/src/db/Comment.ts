import { Model, model, Schema } from "mongoose";

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps: true,
});

interface IComment extends Document {
    text: string;
    song: string;
    user: string;
}

type CommentModel = Model<IComment, {}, {}>;
export const Comment = model<IComment, CommentModel>('Comment', commentSchema);