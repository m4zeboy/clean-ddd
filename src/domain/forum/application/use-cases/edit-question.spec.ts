import { InMemoryQuestionsRepository } from 'test/repositories/questions'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-1',
      title: 'Title edited',
      content: 'Content Edited',
    })
    expect(result.isSuccess()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Title edited',
      content: 'Content Edited',
    })
  })

  it('should not be able to edit a question from another user ', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)
    const result = await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-2',
      title: 'Title edited',
      content: 'Content Edited',
    })
    expect(result.isFailure()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
