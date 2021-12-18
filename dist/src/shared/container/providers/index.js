"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var DayjsDateProvider_1 = require("./DateProvider/implementations/DayjsDateProvider");
var EtherealMailProvider_1 = require("./MailProvider/implementations/EtherealMailProvider");
var SESMailProvider_1 = require("./MailProvider/implementations/SESMailProvider");
var LocalStorageProvider_1 = require("./StorageProvider/implementations/LocalStorageProvider");
var S3StorageProvider_1 = require("./StorageProvider/implementations/S3StorageProvider");
tsyringe_1.container.registerSingleton('DayjsDateProvider', DayjsDateProvider_1.DayjsDateProvider);
var mailProvider = {
    ethereal: tsyringe_1.container.resolve(EtherealMailProvider_1.EtherealMailProvider),
    ses: tsyringe_1.container.resolve(SESMailProvider_1.SESMailProvider),
};
tsyringe_1.container.registerInstance('MailProvider', mailProvider[process.env.MAIL_PROVIDER]);
var diskStorage = {
    local: LocalStorageProvider_1.LocalStorageProvider,
    s3: S3StorageProvider_1.S3StorageProvider,
};
tsyringe_1.container.registerSingleton('StorageProvider', diskStorage[process.env.DISK]);
