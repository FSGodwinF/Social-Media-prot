const mongoose = require("mongoose");

// model for conversations between two parties
const ConversationSchema = new mongoose.Schema(
    {
    members:{
        type: Array,
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Conversation", ConversationSchema);