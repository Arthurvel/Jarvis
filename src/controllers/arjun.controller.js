const Arjun = require('../models/arjun.model.js');

//Como vai ser uma entidade que vai apenas receber e enviar as informações da ferramenta, eu apenas deixei get e post

// todos os recebidos da ferramenta 

const getArjuns = async (req, res) =>{
    try {
        const arjun = await Arjun.find({});
        res.status(200).json(arjun);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//recebidos específicos da ferramenta 

const getArjun = async (req,res) =>{
    try {
        const {id} = req.params;
        const arjun = await Arjun.findById(id);

        //caso não encontre um recebido do sqlmap

        if(!arjun) {
            return res.status(404).json({message: "Report not found"});
        }

        res.status(200).json(arjun);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Não sei se é necessário um post porém fiz, no fim foi bom ter para testar manualmente o get do sqlmap 

const createArjun = async (req, res) =>{
    try{
        const arjun = await Arjun.create(req.body);

        res.status(200).json(arjun);

    }catch(error){
        res.status(500).json({message:error.message});

    }
}


module.exports = {
    getArjuns,
    getArjun,
    createArjun
}