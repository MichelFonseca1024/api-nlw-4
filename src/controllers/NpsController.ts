import { Request, Response } from 'express'
import { getCustomRepository, Not, IsNull } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class NpsController {
  /**
   Detratores == 0-6
   Passivos == 7-8
   Promotores == 9-10
   */
  async execute (req: Request, res: Response) {
    const { survey_id } = req.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({
      where: { survey_id, value: Not(IsNull()) }
    })

    const detratores = surveysUsers.filter(survey => {
      return survey.value <= 6 && survey.value >= 0
    }).length

    const promotores = surveysUsers.filter(survey => {
      return survey.value === 9 || survey.value === 10
    }).length

    const passivos = surveysUsers.filter(survey => {
      return survey.value === 7 || survey.value === 8
    }).length

    const totalAnswers = surveysUsers.length

    const calculate = Number(
      ((promotores - detratores) / totalAnswers) * 100
    ).toFixed(2)

    return res.json({
      detratores,
      promotores,
      passivos,
      NPS: calculate,
      totalAnswers
    })
  }
}

export { NpsController }
