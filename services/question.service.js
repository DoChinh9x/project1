const httpStatus = require('http-status');
const Question = require('../models/question.model');
const ApiError = require('../utils/ApiError');


const questionService = {
      createQuestion : async (questionBody) => {
        return Question.create(questionBody);
      },
    
      getQuestionById : async (id) => {
        return Question.findById(id);
      },
    
        updateQuestionById : async (questionId, updateBody) => {
        const question = await getQuestionById(questionId);
        if (!question) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
        }
        Object.assign(question, updateBody);
        await question.save();
        return question;
      },
    
        deleteQuestionById : async (questionId) => {
        const question = await getQuestionById(questionId);
        if (!question) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
        }
        await question.remove();
        return question;
      },
    
        queryQuestions : async (filter, options) => {
        const exclude = { correctanswer: 0 };
        const questions = await Question.paginate(filter, options, exclude);
        return questions;
      },
      
        getQuestionByListId : async (listId) => {
        const listQuestion = await Question.find({ question: { $in: listId } })
          .select('question')
          .select('correctanswer');
        return listQuestion;
      },
      
        getAllQuestion : async () => {
        return Question.find();
      }
}
module.exports = questionService;