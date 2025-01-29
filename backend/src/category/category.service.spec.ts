import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create.category.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import DuplicateCategoryException from './exception/duplicate.category.exception';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  describe('create', () => {
    it('should call create method of categoryRepository and return a category', async () => {
      const newCategory = {
        title: 'Test Category',
        user: {
          id: 1,
        },
      };
      const mockCategory = {
        ...newCategory,
        id: 1,
      };

      jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(categoryRepository, 'save').mockResolvedValue(mockCategory as Category);

      const result = await service.create(newCategory as CreateCategoryDto);

      expect(categoryRepository.findOne).toHaveBeenCalledWith({
        where: { title: newCategory.title, user: newCategory.user },
      });
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
      expect(categoryRepository.save).toHaveBeenCalledWith(newCategory);
      expect(categoryRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCategory);
    });

    it('should throw DuplicateCategoryException if category already exists', async () => {
      const newCategory = {
        title: 'Test Category',
        user: {
          id: 1,
        },
      };

      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue({ id: 1 } as Category);

      const create = () => service.create(newCategory as CreateCategoryDto);

      await expect(create).rejects.toThrow(BadRequestException);
      await expect(create).rejects.toThrow(
        new ConflictException('Category "Test Category" already exists for user: 1'),
      );
    });
  });
});
