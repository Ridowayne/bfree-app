const io = require('./../server')

const app = require('./../app');
const Form = require('../models/formModels');
const catchAsync = require('./../utils/catchAsync');
const ErrorResponse = require('../utils/appError');
// const APIFeatures = require('../utils/apiFeatures');

// for sending forms
exports.sendForm = catchAsync(async (req, res) => {
  const form = await Form.create({
    sender: { toString: () => req.user.name },
    bfreeID: { toString: () => req.user.bfreeID },
    to: req.body.to,
    subject: req.body.subject,
    body: req.body.body,
  });
   io.emit('newFeedback', form);  

  res.status(200).json({
    status: 'success',
    feedback: {
      form,
    },
  });
});

// for getting all feedback forms GET belonging to the user
exports.readForms = catchAsync(async (req, res) => {
  const allForms = await Form.find({
    sender: { toString: () => req.user.name },
  })
    .select(['-__v'])
    .populate('ratings')
    .sort({ datesubmited: -1 });

  if (!allForms) {
    return next(
      new ErrorResponse('you do not have any feedback submitted yet')
    );
  }
     io.emit('user', allForms);  

  res.status(200).json({
    status: 'success',
    results: allForms.length,
    message: 'all forms available',
    data: {
      allForms,
    },
  });
});

// for responding to responding to forms by resolver post
exports.respondToForm = catchAsync(async (req, res, next) => {
  const response = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    return next(new ErrorResponse('no tour found with such id', 404));
  }
  // io.emit('agentResponse', response);

  res.status(201).json({
    status: 'sucess',
    data: {
      response,
    },
  });
});

// for reading one parrticular form GET
exports.readForm = catchAsync(async (req, res, next) => {
  // const oneForm = await Form.findById(req.params.id).populate('ratings');
  const oneForm = await Form.findOne({ _id: req.params.id });

  if (!oneForm) {
    return next(new ErrorResponse('no form found with such id', 404));
  }

  res.status(200).json({
    status: 'success',
    feedback: {
      oneForm,
    },
  });
});
