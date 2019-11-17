const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const MessagesSchema = new Schema(
    {
        user: String,
        message: String
        // image:
        //     { data: Buffer, contentType: String }
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("messages", MessagesSchema);

// geographic coordinates, temperature, abundance and species identity