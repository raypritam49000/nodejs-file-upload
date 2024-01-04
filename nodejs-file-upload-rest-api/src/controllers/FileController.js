const FileDetailModel = require(`../models/fileDetails`);
const fs = require("fs");
const baseUrl = `http://${process.env.HOST}:${process.env.PORT}/files/`;

const FileController = {

    uploadFile: async (req, res) => {
        try {
            const fileDetailsResponse = await FileDetailModel.create({
                fileName: req.file.filename,
                fileSize: req.file.size,
                fileType: req.file.mimetype,
                fileUrl: baseUrl + req.file.filename
            });
            return res.json(fileDetailsResponse);
        } catch (error) {
            return res.json(error);
        }
    },

    getFileByName: async (req, res) => {
        try {
            const fileName = req.params.name;
            return res.download(process.env.DIRECTORY_PATH + fileName, fileName);
        } catch (error) {
            return res.json(error);
        }
    },

    getListFiles: async (req, res) => {
        try {
            const fileDetails = await FileDetailModel.find();
            return res.json(fileDetails);
        } catch (error) {
            return res.json(error);
        }
    },

    removeFileByName: async (req, res) => {
        try {
            const fileName = req.params.name;
            fs.unlink(process.env.DIRECTORY_PATH + fileName, async (err) => {
                if (err) {
                    return res.status(500).send({ message: "Could not delete the file. " + err });
                }
                await FileDetailModel.deleteOne({ 'fileName': fileName })
                return res.status(200).send({ message: "File is deleted." });
            });
        } catch (error) {
            return res.json(error);
        }
    }

}

module.exports = FileController;