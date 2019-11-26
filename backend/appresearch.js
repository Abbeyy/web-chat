const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ResearchSchema = new Schema(
    {
        user: String,
        coordinates: String,
        temperature: String,
        species: String,
        abundance: Number
    }//,
    // { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("research", ResearchSchema);

// geographic coordinates, temperature, abundance and species identity