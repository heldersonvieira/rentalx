"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DayjsDateProvider_1 = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var MailProviderMemory_1 = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderMemory");
var AppErros_1 = require("../../../../shared/errors/AppErros");
var UsersRepositoryInMemory_1 = require("../../repositories/in-memory/UsersRepositoryInMemory");
var UsersTokensRepositoryInMemory_1 = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");
var SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
var sendForgotPasswordMailUseCase;
var usersRepositoryInMemory;
var usersTokensRepositoryInMemory;
var dayjsDateProvider;
var mailProviderInMemory;
describe('Send forgot mail', function () {
    beforeEach(function () {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        mailProviderInMemory = new MailProviderMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider, mailProviderInMemory);
    });
    it('should be able to send a forgot password mail to user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sendMail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');
                    return [4 /*yield*/, usersRepositoryInMemory.create({
                            driver_license: '123456',
                            email: 'test@test.com',
                            name: 'Name test',
                            password: '1234',
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendForgotPasswordMailUseCase.execute('test@test.com')];
                case 2:
                    _a.sent();
                    expect(sendMail).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to send an email if user does not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(sendForgotPasswordMailUseCase.execute('test2@test.com')).rejects.toEqual(new AppErros_1.AppErros('Users does not exists'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to create an user token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var generateTokenMail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');
                    return [4 /*yield*/, usersRepositoryInMemory.create({
                            driver_license: '654321',
                            email: 'test@test.com.br',
                            name: 'Name test 2',
                            password: '1234',
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendForgotPasswordMailUseCase.execute('test@test.com.br')];
                case 2:
                    _a.sent();
                    expect(generateTokenMail).toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
