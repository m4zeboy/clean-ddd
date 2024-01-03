import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/answer-comments'
import { InMemoryAnswersRepository } from 'test/repositories/answers'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchAnswerCommentsUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })
  it('shoud be able to fetch answer comments', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: answer.id.toString(),
    })
    expect(answerComments).toHaveLength(3)
  })

  it('shoud be able to fetch paginated answer comments', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: answer.id,
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: answer.id.toString(),
    })

    expect(answerComments).toHaveLength(2)
  })
})
