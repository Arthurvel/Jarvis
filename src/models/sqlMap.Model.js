const mongoose = require('mongoose');

//aqui estou reaproveitando a estrutura da entidade Report, pois será a mesma resposta

const SqlMapSchema = mongoose.Schema(
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

const SqlMap = mongoose.models.SqlMap || mongoose.model("SqlMap", SqlMapSchema);

module.exports =  SqlMap;