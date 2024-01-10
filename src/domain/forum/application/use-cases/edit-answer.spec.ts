import { InMemoryAnswersRepository } from 'test/repositories/answers'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: 'author-1',
      content: 'Content Edited',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content Edited',
    })
  })

  it('should not be able to edit a answer from another user ', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: 'author-2',
      content: 'Content Edited',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
