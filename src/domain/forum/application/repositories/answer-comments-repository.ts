import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<AnswerComment>
  delete(answerComment: AnswerComment): Promise<void>
  save(answerComment: AnswerComment): Promise<void>
}
