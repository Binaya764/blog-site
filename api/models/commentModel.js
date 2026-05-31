const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  authorName: {
    type: String,
    default: 'Anonymous', // Allows users to comment without logging in
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // References the Post the comment belongs to
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);