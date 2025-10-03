const {Server} = require('socket.io');
const jwt = require('jsonwebtoken');
const Group = require('../models/Group.model.js');
const Message = require('../models/GroupMessage.model.js');

module.exports = function createSocket(server) { 
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  // Auth handshake
 io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const user = jwt.verify(token, '123secret');
      socket.user = user;
      console.log(user);
      
      next();
    } catch (e) {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.user.id;
    console.log(socket.user); 
    
    // Join all user groups as rooms
    const groups = await Group.find({ members: userId }, '_id');
    const roomIds = groups.map(g => g._id.toString());
    socket.join(roomIds);

    // Allow client to join new groups at runtime
    socket.on('groups:join', (groupIds) => {
      socket.join(groupIds.map(String));
    });

    // Typing indicators
    socket.on('typing:start', ({ groupId }) => {
      socket.to(groupId).emit('typing:update', { groupId, userId, typing: true });
    });
    socket.on('typing:stop', ({ groupId }) => {
      socket.to(groupId).emit('typing:update', { groupId, userId, typing: false });
    });

    // Send message
    socket.on('message:send', async ({ groupId, text, attachments = [] }) => {
      // Persist
      console.log(text);
      
      const msg = await Message.create({ group: groupId, sender: userId, text, attachments, readBy: [userId] });
      await Group.findByIdAndUpdate(groupId, { lastMessage: msg._id });
      const populated = await msg.populate('sender');
      io.to(groupId).emit('message:new', populated);
    });

    // Mark as read
    socket.on('message:read', async ({ groupId, messageIds }) => {
      await Message.updateMany({ _id: { $in: messageIds } }, { $addToSet: { readBy: userId } });
      socket.to(groupId).emit('message:read:update', { groupId, userId, messageIds });
    });

    socket.on('disconnect', () => {});
  });

  return io;
}