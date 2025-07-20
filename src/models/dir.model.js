const mongoose = require('mongoose');

const DirSchema = mongoose.Schema(
    {
        name: {
            type: String,
            
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

const Dir = mongoose.model("Dir", DirSchema);

module.exports =  Dir;