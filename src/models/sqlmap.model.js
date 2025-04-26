const mongoose = require('mongoose');
const fs = require('fs');

const SqlMapSchema = mongoose.Schema(
    {
        resultado: {
            type: String,
            required: [true, "Report name is required"],
        },

    },
    {
        timestamps: true // allow us to have 2 more fields
    }
);

const sqlmap = mongoose.model("sqlmap", SqlMapSchema);

module.exports =  sqlmap;

