# Criar arquivo de requisiçoes http
VERBO http://localhost:3000/nome_da_entidade

# Entrar no create-ENTIDADE.dto.ts
Colocar atributos com validaçoes (IsString(), IsDateString(), IsEmail() etc) -- Tem que importar as bibliotecas disso!!

# Habilitar o middleware para usar o passo anterior no main.ts (Talvez 1 vez ativado sempre ativado)
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

# Atualizar as requisiçoes http
VERBO http://localhost:3000/nome_da_entidade

Content-Type: application/json

                                                   <--- essa linha em branco é necessária!!
                                                   
{

"atributo1": "VALOR"

"atributo2": "VALOR"

}

# Entrar no app.module.ts
Colocar no imports: [TypeOrmModule.forRoot({
      type:'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), RESTO DOS IMPORTS]

# Entrar no ENTIDADE.module.ts
Adicionar o campo:

imports: [TypeOrmModule.forFeature([ENTIDADE ATUAL])]

# Entrar na pasta entities da ENTIDADE e depois no arquivo ENTIDADE.entity.ts

Adicionar colunas do banco de dados da classe (SEM VALIDAÇOES)

@PrimaryColumn() ou Column() com os mesmos atributos do dto e adicionando o ID como PK.

Importar nanoid para segurança do ID:

    const { nanoid } = require("nanoid") // Se o typescript der erro, basta ignorar.
    
Criar o método para gerar o nanoid:

    @BeforeInsert
    
    generateId() {this.id = `ENTIDADE_${nanoid()}`}
    
Anotar a classe como @Entity("ENTIDADE") antes do export class ENTIDADE {}

# Entrar no ENTIDADE.service.ts

import { Repository } from 'typeorm';

import { ENTIDADE } from './entities/ENTIDADE.entity'

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ENTIDADE } from './entities/ENTIDADE.entity'
Renomear os metodos createENTIDADEDto e updateENTIDADEDto para dto apenas, mas só os que estao antes dos dois pontos : !!

Criar o construtor da classe:

    constructor( @InjectRepository(ENTIDADE)
    
    private readonly repository: Repository<ENTIDADE> ) {}

Editar os CRUDs

Apagar todos returns que estiverem nos CRUDs

Mudar todos ids de number para string

Create:

    const ENTIDADE = this.repository.create(dto);
    
    return this.repository.save(ENTIDADE);
    
FindAll:

    return this.repository.find();
    
FindOne:

    return this.repository.findOneBy({CAMPO DE ID COLOCADO NO BANCO DE DADOS : id}); --> normalmente o campo de id vai ser tipo ID_Usuario
    
Update:

    Como colocamos await o método de update precisa ser async -> async update(etc)
    
    const ENTIDADE = await this.repository.findOneBy({CAMPO DE ID COLOCADO NO BANCO DE DADOS : id});
    
    if (!ENTIDADE) return null;
    
    this.repository.merge(ENTIDADE, dto);
    
    return this.repository.save(ENTIDADE);
    
Remove:

    Colocar como async o método também igual o Update
    
    const ENTIDADE = await this.repository.findOneBy({CAMPO DE ID COLOCADO NO BANCO DE DADOS : id});
    
    if (!ENTIDADE) return null;
    
    return this.repository.remove(ENTIDADE);

# Ir para o ENTIDADE.controller.ts

Tirar todos os + dos ids já que eles viraram string e não mais number

Ex: findOne(+id); para findOne(id);

Tratamento de erros:

Delete: colocar @HttpCode(204) na linha após @Delete(':id')

Métodos findOne e update serao async, trocar return por:

    const ENTIDADE = await // resto permanece igual
    
    if (!ENTIDADE) throw new NotFoundException();
    
    return ENTIDADE;

No delete:

    Vai ser async
    
    const ENTIDADE = await // resto permanece igual
    
    if (!ENTIDADE) throw new NotFoundException();
    
    Não tem return
