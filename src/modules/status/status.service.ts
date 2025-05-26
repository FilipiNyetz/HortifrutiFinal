import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {

  constructor( @InjectRepository(Status)
    private readonly repository: Repository<Status> ) {}

  create(dto: CreateStatusDto) {
    const Status = this.repository.create(dto);
    return this.repository.save(Status);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({id_status: id});
  }

  async update(id: string, dto: UpdateStatusDto) {
    const Status = await this.repository.findOneBy({id_status : id});
    if (!Status) return null;
    this.repository.merge(Status, dto);
    return this.repository.save(Status);
  }

  async remove(id: string) {
    const Status = await this.repository.findOneBy({id_status : id});
    if (!Status) return null;
    return this.repository.remove(Status);
  }
}
