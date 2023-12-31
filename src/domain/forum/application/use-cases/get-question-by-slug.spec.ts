import { InMemoryQuestionsRepository } from 'test/repositories/questions'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('shoud be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      content: 'Exemplo de conteúdo',
      title: 'Exemplo de título',
      slug: Slug.create('exemplo-de-titulo'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'exemplo-de-titulo',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('exemplo-de-titulo')
    expect(question.title).toEqual(newQuestion.title)
  })
})
