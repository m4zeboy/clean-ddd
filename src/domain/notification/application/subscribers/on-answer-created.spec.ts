import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'test/repositories/answers'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/answer-attachments'

let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('on answer created', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      new InMemoryAnswerAttachmentsRepository(),
    )
  })

  it.only('shout send a notification when an answer is created', () => {
    const onAnswerCreated = new OnAnswerCreated()
    const answer = makeAnswer()
    inMemoryAnswersRepository.create(answer)
  })
})
