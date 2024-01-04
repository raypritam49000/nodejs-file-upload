const express = require("express");
const router = express.Router();
const FileController = require("../controllers/FileController");
const fileUploadMiddleware = require("../middleware/fileUploadMiddleware");

router.post("/upload", fileUploadMiddleware.single('file'), FileController.uploadFile);
router.get("/files/:name", FileController.getFileByName);
router.delete("/files/:name", FileController.removeFileByName);
router.get("/files", FileController.getListFiles);

module.exports = router;