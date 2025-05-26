import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Status = await this.statusService.findOne(id);
    if (!Status) throw new NotFoundException();
    return Status;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    const Status = await this.statusService.update(id, updateStatusDto);
    if (!Status) throw new NotFoundException();
    return Status
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const Status = await this.statusService.remove(id);
    if (!Status) throw new NotFoundException();
  }
}
