const mongoose = require('mongoose');

const fileDetailsSchema = new mongoose.Schema({
    fileName: {
        type: String,
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: String
    },
    fileUrl: {
        type: String
    }

});

const FileDetailModel = mongoose.model('FileDetails', fileDetailsSchema);

module.exports = FileDetailModel;