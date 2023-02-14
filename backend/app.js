import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsconfig from './config/cors.js';
import authRoutes from './routes/auth.js';
import postCatRoutes from './routes/postCat.js';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';
import logger from './config/winston.js';
import { Error404 } from './classes/errors.js';
import { errorLogger, errorHandler } from './middleware/errorHandling.js';

// App Startup
const app = express();
const domain = process.env.DOMAIN;
const port = process.env.PORT;

// App Configurations
app.use(express.json());
app.use(cors(corsconfig));
app.use(cookieParser());

// App Routes
app.use('/auth', authRoutes);
app.use('/posts/categories', postCatRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// App Index Route
app.get('/', (req, res) => {
  res.send(
    'Verifiquem a Documentação da API, para verem os endpoints disponiveis',
  );
});

// Catch all routes not valid
app.all('*', (req, res, next) => {
  try {
    throw new Error404(
      'route-not-found',
      'The route your looking for does not exist.',
    );
  } catch (e) {
    next(e);
  }
});

// Error Handling Middleware
app.use(errorLogger);
app.use(errorHandler);

// App Server
app.listen(port, () => {
  logger.info(`App is listening at ${domain}:${port}`);
});
