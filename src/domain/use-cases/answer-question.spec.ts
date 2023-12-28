import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()
  const answer = answerQuestion.execute({
    questionId: '1',
    content: 'Nova Resposta',
    instructorId: '1'
  })

  expect(answer.content).toEqual('Nova Resposta')
})