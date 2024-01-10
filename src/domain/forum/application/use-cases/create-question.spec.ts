import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Exemplo de Conteúdo',
      title: 'Exemplo de pergunta',
    })

    expect(result.isSuccess()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
