/* eslint-disable @typescript-eslint/no-unsafe-assignment */
 
 
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Favorito } from '../favoritos/entities/favorito.entity';
import { CreateFavoritoDto } from '../favoritos/dto/create-favorito.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Produto } from '../produto/entities/produto.entity';

// importa o Favorito se ainda não estiver importado:
// import { Favorito } from '../favoritos/entities/favorito.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private favoritosRepository: Repository<Favorito>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async favoritar(dto: CreateFavoritoDto): Promise<Favorito> {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: dto.id_Usuario });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    const produto = await this.produtoRepository.findOneBy({ id: dto.id_Produto });
    if (!produto) throw new NotFoundException('Produto não encontrado');

    const existente = await this.favoritosRepository.findOne({
      where: {
        usuario: { id_usuario: dto.id_Usuario },
        produto: { id: dto.id_Produto },
      },
    });

    if (existente) throw new ConflictException('Produto já foi favoritado por esse usuário.');

    const favorito = this.favoritosRepository.create({
      usuario,
      produto,
      data: new Date().toISOString(),
    });

    return this.favoritosRepository.save(favorito);
  }

  // ✅ Método para buscar todos os favoritos
  async findAll(): Promise<Favorito[]> {
    return this.favoritosRepository.find({
      relations: ['usuario', 'produto'],
    });
  }

  // ✅ Método para buscar favoritos de um usuário específico
  async findByUsuario(id: number): Promise<Favorito[]> {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    return this.favoritosRepository.find({
      where: {
        usuario: { id_usuario: id },
      },
      relations: ['produto'],
    });
  }

  async update(id: number, dto: CreateFavoritoDto): Promise<Favorito> {
  const favorito = await this.favoritosRepository.findOne({ where: { id_Favorito: id }, relations: ['usuario', 'produto'] });
  if (!favorito) throw new NotFoundException('Favorito não encontrado');

  const usuario = await this.usuarioRepository.findOneBy({ id_usuario: dto.id_Usuario });
  if (!usuario) throw new NotFoundException('Usuário não encontrado');

  const produto = await this.produtoRepository.findOneBy({ id: dto.id_Produto });
  if (!produto) throw new NotFoundException('Produto não encontrado');

  // Verificar se já existe outro favorito com esse usuário e produto para evitar duplicação
  const existente = await this.favoritosRepository.findOne({
    where: {
      usuario: { id_usuario: dto.id_Usuario },
      produto: { id: dto.id_Produto },
      id_Favorito: Not(id), // Para ignorar o próprio registro que estamos atualizando
    },
  });

  if (existente) throw new ConflictException('Produto já foi favoritado por esse usuário.');

  favorito.usuario = usuario;
  favorito.produto = produto;
  favorito.data = new Date().toISOString();

  return this.favoritosRepository.save(favorito);
}


  async remove(id: number): Promise<void> {
    const favorito = await this.favoritosRepository.findOne({ where: { id_Favorito: id } });
    if (!favorito) throw new NotFoundException('Favorito não encontrado');

    await this.favoritosRepository.remove(favorito);
  }
}
