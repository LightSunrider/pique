import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Post } from '../posts/entities/post.entity';
import { Profile } from './entities/profile.entity';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let profileService: ProfilesService;
  let postsService: PostsService;

  let someProfile: Profile;
  let somePosts: Post[];

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: createMock<ProfilesService>(),
        },
        {
          provide: PostsService,
          useValue: createMock<PostsService>(),
        },
      ],
    }).compile();

    controller = module.get(ProfilesController);
    profileService = module.get(ProfilesService);
    postsService = module.get(PostsService);

    someProfile = await factory(Profile)().make({ id: '1' });
    somePosts = await factory(Post)().makeMany(5, { profile: someProfile });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfileByQuery', () => {
    it('should get profile by screenName', async () => {
      jest.spyOn(profileService, 'getByScreenName').mockResolvedValue(someProfile);

      await expect(
        controller.getProfileByQuery({ screenName: someProfile.screenName }),
      ).resolves.toEqual(someProfile);
      expect(profileService.getByScreenName).toBeCalledWith(someProfile.screenName);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(profileService, 'getByScreenName').mockRejectedValue(new NotFoundException());

      await expect(
        controller.getProfileByQuery({ screenName: someProfile.screenName }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProfileById', () => {
    it('should get profile by id', async () => {
      jest.spyOn(profileService, 'getById').mockResolvedValue(someProfile);

      await expect(controller.getProfileById(someProfile.id)).resolves.toEqual(someProfile);
      expect(profileService.getById).toBeCalledWith(someProfile.id);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(profileService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getProfileById(someProfile.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProfilePosts', () => {
    const query = new PaginationQueryDto();

    it('should get profile posts', async () => {
      jest.spyOn(profileService, 'getById').mockResolvedValue(someProfile);
      jest.spyOn(postsService, 'findByProfile').mockResolvedValue(somePosts);

      await expect(controller.getProfilePosts(someProfile.id, query)).resolves.toEqual(somePosts);
      expect(postsService.findByProfile).toBeCalledWith(someProfile, query);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(profileService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getProfilePosts(someProfile.id, query)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
