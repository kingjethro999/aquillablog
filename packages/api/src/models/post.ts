import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    pinned: Boolean,
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    hashtags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    mentions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);
