// CORS Configuration
const corsconfig = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  exposedHeaders: ['X-BTH-Total', 'X-BTH-TotalPages'],
};

export default corsconfig;
