
const  questionService  = require('../services/question.service');
const pick = require('../utils/pick');

const questionController  = {
     submitAnswer : (async (req, res) => {
        const listQues = req.body.map((element) => element.question);
        const listQuestions = await questionService.getQuestionByListId(listQues);
        const results = listQuestions.map((e) => {
          let elementResult;
          req.body.forEach((questionElement, index, arr) => {
            if (questionElement.question === e.question) {
              if (questionElement.correctanswer === e.correctanswer) elementResult = { result: true, ...arr[index] };
              else elementResult = { result: false, ...arr[index] };
            }
          });
          return elementResult;
        });
        res.json(results);
      }),
      
       listQuestionsId : (async (req, res) => {
        const filter = pick(req.query, ['_id', 'question', 'answer1', 'answer2', 'answer3', 'answer4']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await questionService.queryQuestions(filter, options);
        res.send(result);
      }),
      
       getAllQuestion : (async (req, res) => {
        const result = await questionService.getAllQuestion();
        res.send(result);
      }),
      
        updateQuestion : (async (req, res) => {
        const question = await questionService.updateQuestionById(req.params.questionId, req.body);
        res.send(question);
      }),
      
        createQuestion : (async (req, res) => {
        const question = await questionService.createQuestion(req.body);
        res.send(question);
      }),
      
        deleteQuestion : (async (req, res) => {
        const question = await questionService.deleteQuestionById(req.params.questionId);
        res.send(question);
      })
      
}

module.exports = questionController;
