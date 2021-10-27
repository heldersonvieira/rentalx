import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
    host: string;
}

getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = 'database'; // ESSA OPÇÃO DEVERÁ SER EXATAMENTE O NOME DADO AO SERICE DO BANCO DE DADOS
    createConnection({
        ...options,
    })
})
