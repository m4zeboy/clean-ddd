import { InMemoryAnswersRepository } from 'test/repositories/answers'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      content: 'Exemplo de resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
