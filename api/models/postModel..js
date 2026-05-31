const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false, // Hidden from the public by default until explicitly published
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // References the User model
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);