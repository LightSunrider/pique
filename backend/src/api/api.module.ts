import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from './shared/middlewares/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { FeedModule } from './feed/feed.module';
import { MediaModule } from './media/media.module';
import { PostsModule } from './posts/posts.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [AuthModule, PostsModule, ProfilesModule, MediaModule, FeedModule],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
