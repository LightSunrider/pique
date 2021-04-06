import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post as HttpPost,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqRequiresAuth } from '../shared/decorators/require-auth.decorator';
import { PqUser } from '../shared/decorators/user.decorator';
import { PostsService } from './posts.service';
import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@ApiTags('Posts')
@Controller('/api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, type: Post })
  createPost(@Body() dto: CreatePostDto, @PqUser('profile') profile: Profile): Promise<Post> {
    return this.postsService.create(profile, dto);
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getPostById(@Param('postId') id: string): Promise<Post> {
    return this.postsService.getById(id);
  }

  @Patch(':postId')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async updatePost(
    @Param('postId') id: string,
    @Body() dto: UpdatePostDto,
    @PqUser('profile') profile: Profile,
  ): Promise<Post> {
    const post = await this.getPostById(id);

    // User can update only own posts
    if (post.profile.id != profile.id) {
      throw new ForbiddenException();
    }

    return this.postsService.update(post, dto);
  }

  @Delete(':postId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Empty Response' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @HttpCode(204)
  async removePost(
    @Param('postId') id: string,
    @PqUser('profile') profile: Profile,
  ): Promise<void> {
    const post = await this.getPostById(id);

    // User can remove only own posts
    if (post.profile.id != profile.id) {
      throw new ForbiddenException();
    }

    return this.postsService.remove(post);
  }
}
