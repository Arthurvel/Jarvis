const mongoose = require('mongoose');

const ArjunSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Report name is required"],
        },

        url: {
            type: String,
            required: [true, "URL is required"],
        }
    },
    {
        timestamps: true // allow us to have 2 more fields
    }
);

const Arjun = mongoose.model("Arjun", ArjunSchema);

module.exports =  Arjun;