"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = require("path"); // do proprio node
var crypto_1 = __importDefault(require("crypto")); // do proprio node
var tmpFolder = (0, path_1.resolve)(__dirname, '..', '..', 'tmp');
exports.default = {
    tmpFolder: tmpFolder,
    storage: multer_1.default.diskStorage({
        destination: tmpFolder,
        filename: function (request, file, callback) {
            var fileHash = crypto_1.default.randomBytes(16).toString('hex'); // criando hash randomicamente para evitar nomes duplicados
            var fileName = fileHash + "-" + file.originalname;
            return callback(null, fileName);
        },
    }),
};
