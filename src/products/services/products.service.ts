import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './../../config';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'lorem lorem',
      price: 10000,
      stock: 300,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  findAll() {
    // const apiKey = this.configService.get('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    // console.log('Usado desde Products', apiKey, dbName);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    console.log(apiKey, dbName);
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
