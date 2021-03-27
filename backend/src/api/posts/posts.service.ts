import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  create(author: Profile, dto: CreatePostDto) {
    const post = new Post();
    post.content = dto.content;
    post.profile = author;

    return this.postRepo.save(post);
  }

  async getById(id: string): Promise<Post> {
    const post = await this.postRepo.findOne({ id });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  update(post: Post, dto: UpdatePostDto): Promise<Post> {
    Object.assign(post, dto);
    return this.postRepo.save(post);
  }

  async remove(post: Post): Promise<void> {
    await this.postRepo.remove(post);
  }
}