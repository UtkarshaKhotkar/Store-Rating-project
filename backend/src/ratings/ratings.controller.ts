import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  submitRating(@Request() req, @Body() body: { storeId: string; rating: number }) {
    return this.ratingsService.submitRating(req.user.userId, body.storeId, body.rating);
  }

  @Get('store/:storeId')
  getStoreRatings(@Param('storeId') storeId: string) {
    return this.ratingsService.getStoreRatings(storeId);
  }

  @Get('user/:storeId')
  getUserRating(@Request() req, @Param('storeId') storeId: string) {
    return this.ratingsService.getUserRating(req.user.userId, storeId);
  }

  @Get('count')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  count() {
    return this.ratingsService.count();
  }
}
