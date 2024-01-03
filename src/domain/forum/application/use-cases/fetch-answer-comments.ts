import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) { }

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId({ page }, answerId)
    return { answerComments }
  }
}
