const SqlMap = require('../models/sqlMap.Model.js');

//Como vai ser uma entidade que vai apenas receber e enviar as informações da ferramenta, eu apenas deixei get e post

// todos os recebidos da ferramenta 

const getSqlMaps = async (req, res) =>{
    try {
        const sqlmap = await SqlMap.find({});
        res.status(200).json(sqlmap);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//recebidos específicos da ferramenta 

const getSqlMap = async (req,res) =>{
    try {
        const {id} = req.params;
        const sqlmap = await SqlMap.findById(id);

        //caso não encontre um recebido do sqlmap

        if(!sqlmap) {
            return res.status(404).json({message: "Report not found"});
        }

        res.status(200).json(sqlmap);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Não sei se é necessário um post porém fiz, no fim foi bom ter para testar manualmente o get do sqlmap 

const createSqlMap = async (req, res) =>{
    try{
        const sqlmap = await SqlMap.create(req.body);

        res.status(200).json(sqlmap);

    }catch(error){
        res.status(500).json({message:error.message});

    }
}


module.exports = {
    getSqlMaps,
    getSqlMap,
    createSqlMap
}