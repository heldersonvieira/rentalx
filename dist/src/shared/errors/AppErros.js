"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErros = void 0;
var AppErros = /** @class */ (function () {
    function AppErros(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return AppErros;
}());
exports.AppErros = AppErros;
