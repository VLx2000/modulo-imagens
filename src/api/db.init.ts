import Image from 'api/models/Image';
const isDev = process.env.NODE_ENV === 'development';

// alterar a table automaticamente n deve ser usado em produçao
const dbInit = () => {
  Image.sync({ alter: isDev });
}
export default dbInit;