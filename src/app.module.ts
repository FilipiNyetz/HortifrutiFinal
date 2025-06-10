import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';;
import { UsuarioModule } from './modules/usuario/usuario.module';
import { UfsModule } from './modules/ufs/ufs.module';
import { CidadesModule } from './modules/cidades/cidades.module';
import { LojaModule } from './modules/loja/loja.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { MetodoPagamentoModule } from './modules/metodo-pagamento/metodo-pagamento.module';
import { StatusModule } from './modules/status/status.module';
import { CarrinhoModule } from './modules/carrinho/carrinho.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { PerfilModule } from './modules/perfil/perfil.module';
import { EntregaModule } from './modules/entrega/entrega.module';
import { FavoritoModule } from './modules/favoritos/favoritos.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { UnidadeMedidaModule } from './modules/unidade-medida/unidade-medida.module';
import { CompraModule } from './modules/compra/compra.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ItensCarrinhoModule } from './modules/itens-carrinho/itens-carrinho.module';
import { HistoricoCompraModule } from './modules/historico-compra/historico-compra.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule, UfsModule, CidadesModule, LojaModule, CategoriaModule, ProdutoModule, MetodoPagamentoModule, StatusModule, CarrinhoModule, EnderecoModule, EstoqueModule, PerfilModule, EntregaModule, FavoritoModule, AvaliacaoModule, UnidadeMedidaModule, CompraModule, AuthModule, ItensCarrinhoModule, HistoricoCompraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
