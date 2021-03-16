import { Router } from 'express'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { SendEmailController } from './controllers/SendEmailController'
import { SurveyController } from './controllers/SurveyController'
import { UserCrontroller } from './controllers/UserController'

const router = Router()

const surveyController = new SurveyController()
const userCrontroller = new UserCrontroller()
const sendEmailController = new SendEmailController()
const answerController = new AnswerController()
const npsController = new NpsController()

//Users
router.post('/users', userCrontroller.create)

//Surveys
router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

// survey to user
router.post('/sendMail', sendEmailController.execute)

// save response from user
router.get('/answers/:value', answerController.execute)

//get data from nps
router.get('/nps/:survey_id', npsController.execute)

export { router }
