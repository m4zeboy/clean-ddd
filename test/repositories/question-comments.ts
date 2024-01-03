import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository {
  public items: QuestionComment[] = []
  async findById(id: string) {
    const item = this.items.find((item) => item.id.toString() === id)
    if (!item) return null
    return item
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
    return questionComment
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )
    this.items.splice(itemIndex, 1)
  }

  async save(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )
    this.items[itemIndex] = questionComment
  }
}
