import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RetailerGuard } from 'src/guard/retailer.guard';
import { RetailerService } from './retailer.service';

@Controller('retailer')
export class RetailerController {
  constructor(private retailerService: RetailerService) {}
  @UseGuards(RetailerGuard)
  @Get('/retailer-recieved')
  async getProductInRetailer(@Req() req: any) {
    const user = req.user;
    return this.retailerService.queryProductInRetailer(user);
  }
}
