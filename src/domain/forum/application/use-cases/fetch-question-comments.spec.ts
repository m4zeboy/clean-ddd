import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/question-comments'
import { InMemoryQuestionsRepository } from 'test/repositories/questions'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchQuestionCommentsUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })
  it('shoud be able to fetch question comments', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: question.id.toString(),
    })
    expect(questionComments).toHaveLength(3)
  })

  it('shoud be able to fetch paginated question comments', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: question.id,
        }),
      )
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: question.id.toString(),
    })

    expect(questionComments).toHaveLength(2)
  })
})
