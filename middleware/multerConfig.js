const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        const allowedFileTypes = ['image/png','image/jpg','image/jpeg'];
        if(!allowedFileTypes.includes(file.mimetype)) {
            return cb(new Error("This file is not supported"));
        }
        cb(null,"./uploads")
    },
    filename : function(req,file,cb) {
        cb(null,Date.now() + '-' + file.originalname)
    }
})

module.exports = {
    multer,
    storage
}