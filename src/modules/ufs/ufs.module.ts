import { Module } from '@nestjs/common';
import { UfsService } from './ufs.service';
import { UfsController } from './ufs.controller';
import { Uf } from './entities/uf.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Uf])],
  controllers: [UfsController],
  providers: [UfsService],
})
export class UfsModule {}
