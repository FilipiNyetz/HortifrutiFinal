import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,          // Transforma automaticamente os tipos
      whitelist: true,         // Remove propriedades não decoradas nos DTOs
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades não permitidas
      disableErrorMessages: false, // Mantém mensagens de erro detalhadas
    })
  );

  // Configuração para lidar com serialização circular
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  // Configuração de CORS (opcional)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Aplicação rodando na porta ${port}`);
}
bootstrap();