const Report = require('../models/report.model.js');
const {sendMessage} = require('../kafka/producer.js');

const getReports = async (req, res) =>{
    try {
        const report = await Report.find({});
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getReport = async (req,res) =>{
    try {
        const {id} = req.params;
        const report = await Report.findById(id);
        if(!report) {
            return res.status(404).json({message: "Report not found"});
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const createReport = async (req, res) =>{
    try{
        const report = await Report.create(req.body);

        await sendMessage('report',{
            id: report.id,
            url: report.url
        });

        res.status(200).json(report);
    }catch(error){
        res.status(500).json({message:error.message});

    }
}

const updateReport = async (req, res) =>{
    try {
        const {id} = req.params;
        const report = await Report.findByIdAndUpdate(id, req.body);

        if(!report) {
            return res.status(404).json({message: "Report not found"});
        }
        return res.status(200).json({message: "Updated"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const deleteReport = async (req, res) =>{
    try {
        const {id} = req.params;
        const report = await Report.findByIdAndDelete(id);

        if (!report){
            return res.status(404).json({message: "Report not found "});
        }
        res.status(200).json({message:"Deleted with sucess"});

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport
}