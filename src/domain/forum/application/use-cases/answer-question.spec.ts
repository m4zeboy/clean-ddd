import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log('')
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestion.execute({
    questionId: '1',
    content: 'Nova Resposta',
    instructorId: '1',
  })

  expect(answer.content).toEqual('Nova Resposta')
})
