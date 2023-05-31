import { Injectable } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import type { CreateReviewDto } from './dto/create-review.dto';
import { createdReviewTelegramParse } from './parser/createdReviewTelegramparse';

@Injectable()
export class ReviewService {
  constructor(private readonly telegramService: TelegramService) {}

  async create(dto: CreateReviewDto) {
    await this.telegramService.sendMessage(createdReviewTelegramParse(dto));
    return 'Review created';
  }
}
