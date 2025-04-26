const sqlmap = require('../models/sqlmap.model.js');
const fs = require('fs');

const getSqlMap = async (req, res) =>{
    fs.readFile('sqlmap_result.json', 'utf8', (error, data) => {
        if (error) {
            return res.status(500).json({message:'Erro ao ler o arquivo JSON'});
        }

        try {
            const sqlmap = JSON.parse(data);
            res.json(sqlmap);
        } catch (error) {
            res.status(500).json({message:'Erro ao converter JSON'});
        }
        });
}

module.exports = {
    getSqlMap
}