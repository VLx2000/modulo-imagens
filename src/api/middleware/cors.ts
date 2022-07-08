import cors from 'cors';

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const cors_config = cors(options);

export default cors_config;