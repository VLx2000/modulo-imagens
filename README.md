# Módulo de upload e armazenamento de imagens

### Bibliotecas usadas
#### Backend
- Express
- Multer: upload de imagens
- Fs: interação com o sistema de arquivos
- Sequelize: ORM SQL para PostgreSQL
- CORS
- Crypto

#### Frontend
- Bootstrap/React Bootstrap: framework css
- Axios: cliente http

### Funcionamento
Neste módulo, o cliente, após logado, pode realizar o upload de uma imagem no formato .nii/.nii.gz para o servidor. Essas imagens serão salvas no sistema de arquivos no diretório configurado em ```src/api/middleware/upload.ts```, através da estrutura de pastas: ```pasta_upload/idUser/idPaciente```. Ao mesmo tempo em que são salvas suas informações  no banco de dados postgres (nome (gerado automaticamente), caminho, tipo, aquisição, data de upload e modificação).

### Rotas disponíveis
> No caminho `/api/v1`

Requisição | Rota | Função
--------- | ------ | ------
get | `/` | obter todas as imagens salvas
get | `/id` | obter imagem de determinado id
post | `/` | criar nova imagem
put | `/id` | atualizar imagem
put | `/hide/id` | ocultar imagem
delete | `/id` | deletar imagem
