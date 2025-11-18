"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const seed_1 = require("./database/seed");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const dataSource = app.get('DataSource');
    await (0, seed_1.seedDatabase)(dataSource);
    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map