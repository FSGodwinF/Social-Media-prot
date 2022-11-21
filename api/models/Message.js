const mongoose = require("mongoose");
// model for a chat
//consisting of a conversationID, sender, and a text
const MessageSchema = new mongoose.Schema(
    {
    conversationId:{
        type: String,
    },
    sender:{
        type: String
    },
    text:{
        type: String
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Message", MessageSchema);