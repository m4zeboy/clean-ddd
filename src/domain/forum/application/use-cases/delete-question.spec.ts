import { InMemoryQuestionsRepository } from 'test/repositories/questions'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('DeleteQuestion Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('shoud be able to delete a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({ questionId: 'question-1', authorId: 'author-1' })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('shoud not be able to delete a question from another user ', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    expect(() => {
      return sut.execute({ questionId: 'question-1', authorId: 'author-2' })
    }).rejects.toBeInstanceOf(Error)
  })
})
