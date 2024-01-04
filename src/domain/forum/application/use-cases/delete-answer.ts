import { Either, failure, success } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<string, {}>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId)

    if (!question) {
      return failure('Answer not found.')
    }

    if (authorId !== question.authorId.toString()) {
      return failure('Not Allowed')
    }

    await this.answersRepository.delete(question)
    return success({})
  }
}
