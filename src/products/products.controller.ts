import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts() {
    return { message: 'Products sent successfully' };
  }

  @Put('')
  async updateProducts() {
    return { message: 'Product updated successfully' };
  }

  @Post('')
  async createProduct() {
    return { message: 'Product added successfully' };
  }

  @Delete('')
  async DeleteProducts() {
    return { message: 'Product deleted successfully' };
  }
}
