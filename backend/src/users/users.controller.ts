import { Controller, Get, Post, Body, Param, UseGuards, Request, Query, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() userData: any) {
    return this.usersService.create(userData);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query() filters: any) {
    return this.usersService.findAll(filters);
  }

  @Get('count')
  @Roles(UserRole.ADMIN)
  count() {
    return this.usersService.count();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('password')
  updatePassword(@Request() req, @Body() body: { password: string }) {
    return this.usersService.updatePassword(req.user.userId, body.password);
  }
}
