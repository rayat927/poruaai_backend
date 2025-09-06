const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Optional: lastMessage for list previews
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupMessage' },
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);