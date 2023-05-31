import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  controllers: [ReviewController],
  imports: [TelegramModule],
  providers: [ReviewService],
})
export class ReviewModule {}
