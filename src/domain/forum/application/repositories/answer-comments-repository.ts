import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    params: PaginationParams,
    answerId: string,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<AnswerComment>
  delete(answerComment: AnswerComment): Promise<void>
  save(answerComment: AnswerComment): Promise<void>
}
