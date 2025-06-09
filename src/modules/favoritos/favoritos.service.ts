import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorito } from './entities/favorito.entity';
import { Repository } from 'typeorm';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Produto } from 'src/modules/produto/entities/produto.entity';

@Injectable()
export class FavoritoService {
  constructor(
    @InjectRepository(Favorito)
    private readonly favoritoRepository: Repository<Favorito>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) { }

  async create(dto: CreateFavoritoDto): Promise<Favorito> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: dto.id_Usuario } });
    const produto = await this.produtoRepository.findOne({ where: { id: dto.id_Produto } });

    if (!usuario || !produto) {
      throw new NotFoundException('Usuário ou Produto não encontrado');
    }

    const favorito = this.favoritoRepository.create({
      usuario,
      produto,
      data: new Date().toISOString(),
    });

    return await this.favoritoRepository.save(favorito);
  }

  async findAll(): Promise<Favorito[]> {
    return await this.favoritoRepository.find({
      relations: ['usuario', 'produto'],
    });
  }

  async findByUsuario(usuarioId: number): Promise<Favorito[]> {
    return await this.favoritoRepository.find({
      where: { usuario: { id_usuario: usuarioId } },
      relations: ['produto'], // Se quiser os dados do produto
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const favorito = await this.favoritoRepository.findOne({ where: { id_Favorito: id } });

    if (!favorito) {
      throw new NotFoundException('Favorito não encontrado');
    }

    await this.favoritoRepository.remove(favorito);
    return { message: 'Favorito removido com sucesso' };
  }
}
