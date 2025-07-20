const Dir = require('../models/dir.model.js');

//Como vai ser uma entidade que vai apenas receber e enviar as informações da ferramenta, eu apenas deixei get e post
// todos os recebidos da ferramenta 

const getDirs = async (req, res) =>{
    try {
        const dirsearch = await Dir.find({});
        res.status(200).json(dirsearch);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//recebidos específicos da ferramenta 

const getDir = async (req,res) =>{
    try {
        const {id} = req.params;
        const dirsearch = await Dir.findById(id);

        //caso não encontre um recebido do sqlmap

        if(!dirsearch) {
            return res.status(404).json({message:"Dir not found"});
        }

        res.status(200).json(dirsearch);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Não sei se é necessário um post porém fiz, no fim foi bom ter para testar manualmente o get do sqlmap 

const createDir = async (req, res) =>{
    try{
        const dirsearch = await Dir.create(req.body);

        res.status(200).json(dirsearch);

    }catch(error){
        res.status(500).json({message:error.message});

    }
}


module.exports = {
    getDirs,
    getDir,
    createDir
}