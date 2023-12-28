import { Anwser } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
interface AnswerQuestionUseCaseReponse { }
export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Anwser({ content, authorId: instructorId, questionId })

    return answer
  }
}