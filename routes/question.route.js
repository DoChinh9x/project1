const express = require('express');
const validate = require('../middlewares/validate');
const questionController = require('../controllers/question.controller');
const { verifyToken, verifyTokenAdmin} = require('../middlewares/auth.verify');
const questionValidation = require('../validations/question.validation');
const router = express.Router();

router.get('/',verifyToken, questionController.listQuestionsId);
router.post('/submit', verifyToken, validate(questionValidation.submitAnswer), questionController.submitAnswer);
router.get('/edit', verifyToken, questionController.listQuestionsId);
router.post(
  '/edit',
  verifyTokenAdmin,
  validate(questionValidation.createQuestion),
  questionController.createQuestion
);
router.patch(
  '/edit/:questionId',
  verifyTokenAdmin,
  validate(questionValidation.updateQuestion),
  questionController.updateQuestion
);
router.delete(
  '/edit/:questionId',
  verifyTokenAdmin,
  validate(questionValidation.deleteQuestion),
  questionController.deleteQuestion
);
module.exports = router;