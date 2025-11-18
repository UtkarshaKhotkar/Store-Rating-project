import { Controller, Get, Post, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() storeData: any) {
    return this.storesService.create(storeData);
  }

  @Get()
  findAll(@Query() filters: any) {
    return this.storesService.findAll(filters);
  }

  @Get('count')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  count() {
    return this.storesService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }
}
