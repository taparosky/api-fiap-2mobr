# api-fiap-2mobr
Entrega de trabalho final do módulo de API &amp; MICROSSERVICES DEVELOPMENT no curso de MBA de Desenvolvimento Mobile na FIAP.

Foram desenvolvidos três serviços em Node JS conectados ao banco de dados Mongo DB:

1. cadastro_usuarios
  - Este serviço é responsável por cadastrar os clientes na base de dados com informações básicas. Este serviço criptografa a senha cadastrada e também realiza a autenticação do usuário. Quando o usuário é autenticado com sucesso, um token é gerado e é utilizado para permitir o acesso aos demais serviços. Também é possível alterar a senha cadastrada.
3. atualiza_usuarios
  - É verificado se o token é válido e então é permitido realizar o cadastro de novos usuários e alterar os dados de usuários já cadastrados
4. cadastro_financeiro
  - Utilizando o mesmo token anterior, permite-se o cadastro de dados financeiros atrelados aos usuários cadastrados. Os dados são salvos em uma collection separada mas com referência ao ID do usuário cadastrado na collection clientes no Mongo DB.
