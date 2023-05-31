import { CreateReviewDto } from '../dto/create-review.dto';

export const createdReviewTelegramParse = (dto: CreateReviewDto): string => {
  console.log(dto);
  const from = dto.reviewerName
    ? `Відгук від ${dto.reviewerName} ${dto.phoneNumber}`
    : '';
  const dishesRate = `Оцінка блюд: ${Array(dto.dishesRate + 1).join('⭐')}`;
  const serviceRate = `Оцінка сервісу: ${Array(dto.serviceRate + 1).join(
    '⭐',
  )}`;
  const comment = dto.comment ? `Коментар користувача: ${dto.comment}` : '';
  const reviewText = [from, dishesRate, serviceRate, comment];

  return reviewText.concat().join('\n\n');
};
