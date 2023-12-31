import { InMemoryAnswersRepository } from 'test/repositories/answers'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('shoud be able to edit a answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toValue(),
      authorId: 'author-1',
      content: 'Content Edited',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content Edited',
    })
  })

  it('shoud not be able to edit a answer from another user ', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toValue(),
        authorId: 'author-2',
        content: 'Content Edited',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
