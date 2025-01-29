import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import DuplicateCategoryException from './exception/duplicate.category.exception';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existCategory = await this.categoryRepository.findOne({
      where: {
        title: createCategoryDto.title,
        user: createCategoryDto.user,
      },
    });

    if (existCategory) {
      throw new DuplicateCategoryException(createCategoryDto.title, createCategoryDto.user.id);
    }

    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
