const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.DIRECTORY_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, +  Date.now() + "_" + file.originalname);
    }
});

const fileUploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Invalid file type');
            error.code = 'INVALID_FILE_TYPE';
            return cb(error, false);
        }

        cb(null, true);
    }
});

module.exports = fileUploadMiddleware;