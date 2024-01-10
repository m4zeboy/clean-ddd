import { InMemoryQuestionsRepository } from 'test/repositories/questions'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to delete a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user ', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)
    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })
    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
