Como crear API-Gateway:
1.	Generar proyecto: npx nest new api-gateway
2.	Crear archivo de variables de entorno: mkdir .env.development -> 
API_PORT=3000
JWT_SECRET=clavesecreta2312
EXPIRES_IN=12h
AMQP_URL=amqp://user:password@localhost:5672 # // local
# AMQP_URL=amqps://zmztalww:CRDe99EpSEdVY-IPYlC8MPmF7f7mrSpO@jackal.rmq.cloudamqp.com/zmztalww
# AMQP_URL=amqp://rabbitmq:5672 // servidor
3.	Instalar configuración de nest: npm install @nestjs/config 
4.	Configurar nest config variables de entorno: app.module.ts ->    
Imports: [ConfigModule.forRoot({
envFilePath: ['.env.development'], 
   		isGlobal: true,
 }), …]
5.	Crear carpeta comun (common): 
mkdir common/filters -> http-expception.filter.ts ->
https://github.com/MonoSapiens/MicroBackFront/blob/main/api-gateway/common/filters/http-exception.filter.ts
mkdir common/interceptors -> timeout.interceptor.ts ->
https://github.com/MonoSapiens/MicroBackFront/blob/main/api-gateway/common/interceptors/timeout.interceptor.ts
mkdir common/interfaces -> component.interface.ts ->
https://github.com/MonoSapiens/MicroBackFront/blob/main/api-gateway/common/interfaces/element.interface.ts
mkdir common/ -> constants.ts -> 
 	       export enum RabbitMQ{ userQueue = ‘users’ } export enum UserMSG { CREATE = ‘CREATE_USER’}  
6.	Configurar carpeta comun: en main.ts -> 
app.useGlobalFilters(new AllExceptionFilter());
app.useGlobalInterceptors(new TimeOutInterceptor());
app.useGlobalPipes(new ValidationPipe());
7.	Instalar dependencias para rabbitMQ: npm install amqplib amqp-connection-manager class-validator class-transformer @nestjs/microservices @nestjs/swagger @nestjs/jwt passport-jwt @types/passport-jwt passport-local
8.	Configurar main: en main.ts ->
 	const options = new DocumentBuilder()
  	.setTitle('API')
 	 .setDescription(‘Descripción.')
 	 .setVersion('1.0')
 	 .addBearerAuth() // autentication 
 	 .build();
  const document = SwaggerModule.createDocument(app, options);
 	 SwaggerModule.setup('/api/docs', app, document,{
   	 swaggerOptions: { filter: true,  }
  });
app.enableCors();
await app.listen(parseInt(process.env.API_PORT)); 


DOCKER RABBITMQ: -> docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3-management




Como crear un microservicio: 
1.	generar proyecto: nest new microservice-name
2.	instalar dependencias base: npm install amqplib amqp-connection-manager @nestjs/config mongoose @nestjs/microservices
3.	crear los componentes: nest g mo name // nest g s name // nest g co name // mkdir schema
4.	generar la conexión con rabbitMQ: en main.ts -> 
const app = await NestFactory.createMicroservice(AppModule,{    
 transport: Transport.RMQ,
 	 options: {
      	      urls: [process.env.AMQP_URL],
      	      queue: RabbitMQ.InMeetingQueue,
 },});}) 
5.	generar la conexión con base de datos mongo: en app.module.ts -> import MongooseModule.forRoot(process.env.URI_MONGODB)
6.	definir esquema: en nombre.schema.ts . import * as mongoose from 'mongoose'; export const ModuleSchema = new mongoose.Schema( { name: { type: String, required: true },},
7.	definir servicio en nombre.service.ts:
o	7.1 definir constructor para crear estructuras en base de datos: constructor(@InjectModel('nombre') private readonly model: Model<any>, ) { }
o	7.2 crear cada uno de los metodos: async findAll(): Promise<any[]> { return await this.model.find();} //ejemplo de metodo para obtener todos
8.	definir controlador en nombre.controller.ts: 
o	8.1 definir constructor para llamar al servicio (7): constructor(private readonly nombreService: NombreService) { }
o	8.2 crear cada uno de los metodos: @MessagePattern('BUSCAR_TODAS_NOMBRE') async findAll() { return await this.nombreService.findAll();}

o	importante: 'BUSCAR_TODAS_NOMBRE' es como identificamos el metodo desde afuera
9.	definir variables de entorno en .env.development y llamarlas en el codigo con "process.env.NOMBRE"





Como generar la conexión entre microservicio y api-gateway: 
1.	Crear los componentes: 
nest g mo component -> component.module.ts -> imports: [ProxyModule],
nest g co component -> component.controller.ts -> 
2.	Crear DTO: mkdir component/dto -> component.dto.ts -> 
export class ComponentDTO { @ApiProperty() @IsNotEmpty() @IsString() readonly name: string }
3.	Generar la conexión con rabbitMQ y el microservicio: 
common/proxy/proxy.module.ts -> 
@Module({
    providers: [ClientProxyMoonei],
    exports: [ClientProxyMoonei]
})
export class ProxyModule{}
common/proxy/client.proxy.ts  ->
@Injectable()
export class ClientProxyMoonei {
    clientProxyModulo() { throw new Error('Method not implemented.'); }
    constructor(private readonly config: ConfigService) { }
    clientProxyUser(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.UserQueue,
  }, }); }}
4.	Definir controlador: en component.controller.ts ->
@ApiTags('Microservicio de proyectos (microservice-projects)')
@UseGuards(JwtAuthGuard)
constructor(private readonly clientProxy: ClientProxyMoonei) { } private _clientProxyNombre = this.clientProxy.clientProxyNombre();

@Get('/get/all') async findAll() { return await this._clientProxyNombre.send('BUSCAR_TODAS_NOMBRE',''); }
importante: 'BUSCAR_TODAS_NOMBRE' es como identificamos el metodo desde afuera










Como generar modulo de autentifiación en api-gateway: 
1.	Generar modulo: 
nest g mo auth -> auth.module.ts -> 
@Module({
  imports: [
    UserModule,
    PassportModule,
    ProxyModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: config.get('EXPIRES_IN'),
          audience: config.get('APP_URL'),
        },  }),   }), ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ]})
export class AuthModule {}
nest g co auth -> auth.controller.ts -> 
nest g s auth -> auth.service.ts -> 
mkdir auth/dto -> login.dto.ts -> 
2.	Crear estrategias: mkdir strategies/jwt.strategy.ts -> 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        }); }
    async validate(payload: any){
        return await {id: payload.id, email: payload.email}}}
mkdir strategies/local.strategy.ts ->
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) { super(); }
  async validate(username: string, password: string): Promise<any> {
  const user = await this.authService.validateUser(username, password);
    if (!user) {  /* throw new UnauthorizedException();  */  } else{   return user;   }  }}
3.	Crear guards: mkdir auth/guards/jwt-auth-guard.ts ->
import { Injectable } from "@nestjs/common"; import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}
mkdir auth/guards/jwt-local-guard.ts ->
import { Injectable } from "@nestjs/common"; import { AuthGuard } from "@nestjs/passport";
@Injectable()


4.	Configurar controlador auth: mkdir auth/auth.controller.ts ->
https://github.com/MonoSapiens/MicroBackFront/blob/main/api-gateway/auth.controller.ts
https://github.com/MonoSapiens/MicroBackFront/blob/main/api-gateway/auth.module.ts
https://github.com/MonoSapiens/MicroBackFront/blob/main/api-gateway/auth.service.ts
