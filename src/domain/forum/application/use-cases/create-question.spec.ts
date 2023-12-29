import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {
    return question
  },
}

test('create a questions', async () => {
  const createQuestion = new CreateQuestionseCase(fakeQuestionsRepository)
  const { question } = await createQuestion.execute({
    authorId: '1',
    content: 'Exemplo de Conteúdo',
    title: 'Exemplo de pergunta',
  })

  expect(question.id).toBeTruthy()
})
