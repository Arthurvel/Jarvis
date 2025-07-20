const Xss = require('../models/xss.model.js');

//Como vai ser uma entidade que vai apenas receber e enviar as informações da ferramenta, eu apenas deixei get e post
// todos os recebidos da ferramenta 

const getXsss = async (req, res) =>{
    try {
        const xsss = await Xss.find({});
        res.status(200).json(xsss);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//recebidos específicos da ferramenta 

const getXss = async (req,res) =>{
    try {
        const {id} = req.params;
        const xss = await Xss.findById(id);

        //caso não encontre um recebido do sqlmap

        if(!xss) {
            return res.status(404).json({message:"XSS not found"});
        }

        res.status(200).json(xss);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Não sei se é necessário um post porém fiz, no fim foi bom ter para testar manualmente o get do sqlmap 

const createXss = async (req, res) =>{
    try{
        const xss = await Xss.create(req.body);

        res.status(200).json(xss);

    }catch(error){
        res.status(500).json({message:error.message});

    }
}


module.exports = {
    getXsss,
    getXss,
    createXss
}