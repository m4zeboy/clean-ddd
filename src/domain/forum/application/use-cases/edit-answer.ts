import { Either, failure, success } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return success({ answer })
  }
}
