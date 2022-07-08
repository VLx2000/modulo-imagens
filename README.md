# Módulo de upload e armazenamento de imagens

### Bibliotecas usadas
#### (Node.js - TypeScript)
- Express
- Multer: upload de imagens
- Fs: interação com o sistema de arquivos
- Sequelize: ORM SQL para PostgreSQL
- CORS
- Crypto

### Para executar
```
npm install && npm start
``` 

> Necessário configurar banco de dados postgres em ```src/api/config/db.config.ts```

### Funcionamento
Neste módulo, o cliente, após logado, pode realizar o upload de uma imagem no formato .nii/.nii.gz para o servidor. Essas imagens serão salvas no sistema de arquivos no diretório configurado em ```src/api/config/dir.config.ts```, através da estrutura de pastas: ```pasta_principal/pasta_upload/idUser/idPaciente```. Ao mesmo tempo em que são salvas suas informações no banco de dados postgres (nome (gerado automaticamente), caminho, tipo, aquisição, data de upload e modificação).

### Rotas disponíveis
> No caminho `/api/v1/images`

Requisição | Rota | Função
--------- | ------ | ------
get | `/idPaciente` | obter todas as imagens de determinado paciente
post | `/` | criar nova imagem
put | `/update/id` | atualizar imagem
put | `/archive/id` | arquivar imagem
delete | `/id` | deletar imagem
