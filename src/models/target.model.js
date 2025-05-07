const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema(
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

const Report = mongoose.model("Report", ReportSchema);

module.exports =  Report;