<!-- **RF** => Requisitos funcionais | **RNF** => Requisitos não funcionais | **RN** => Regras de negócios -->

# Cadastro de carro

**RF**
[x] Deve ser possível cadastrar um novo carro.

**RN**
[x] Não deve ser possível cadastrar um carro com uma placa já existente.
[x] O carro deve ser cadastrado, por padrão com disponibilidade.
[x] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carro

**RF**
[x] Deve ser possível listar todos os carros disponíveis.
[x] Deve ser possível listar todos os carros disóníveis pelo nome da categoria.
[x] Deve ser possível listar todos os carros disóníveis pelo nome da marca.
[x] Deve ser possível listar todos os carros disóníveis pelo nome do carro.

**RN**
[] O usuário não precisa estar logado para acessar o sistema.

# Cadastro de especificação no carro

**RF**
[x] Deve ser possível cadastrar uma especificação para um carro.

**RN**
[x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[x] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagem do carro

**RF**
[x] Deve ser possível cadastrar a imagem do carro. 
[x] Deve ser possível listar todos os carros.

**RNF**
[x] Utilizar o multer para upload de arquivos.

**RN**
[x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[x] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel do carro

**RF**
[] Deve ser possível cadastrar um aluguel.

**RN**
[] O aluguel deve ter duração mínima de 24 horas.
[] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
[] Não deve ser possível cadastrar um novo aluguem caso já exista um aberto para o mesmo carro.
