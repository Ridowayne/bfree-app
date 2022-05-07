// enum: ['AM', 'Team Lead', 'IT', 'Engineering', 'Management'],
const io = require('./../server')

const Form = require('../models/formModels');
const catchAsync = require('../utils/catchAsync');
const ErrorResponse = require('../utils/catchAsync');

// getting engineering issues
exports.engineeringAll = catchAsync(async (req, res, next) => {
  const engineeringIssues = await Form.find({ to: 'Engineering' })
    .select(['-__v'])
    .populate('ratings')
    .sort({ datesubmited: -1 });

  io.emit('engineIssues', engineeringIssues);

  res.status(200).json({
    status: 'success',
    results: engineeringIssues.length,
    data: {
      engineeringIssues,
    },
  });
});

//  for getting answered tickets
exports.allansweredtickets = catchAsync(async (req, res, next) => {
  const answeredTickets = await Form.find({
    to: 'Engineering',
    answered: true,
  })
    .select(['-__v'])
    .populate('ratings')
    .sort({ datesubmited: -1 });

  io.emit('newFeedback', answeredTickets);

  res.status(200).json({
    status: 'success',
    results: answeredTickets.length,
    data: {
      answeredTickets,
    },
  });
});

// for getting unanswered tickests
exports.allunansweredtickets = catchAsync(async (req, res, next) => {
  const unAnsweredTickets = await Form.find({
    to: 'Engineering',
    answered: false,
  })
    .select(['-__v'])
    .populate('ratings')
    .sort({ datesubmited: -1 });

  io.emit('newFeedback', unAnsweredTickets);

  res.status(200).json({
    status: 'success',
    results: unAnsweredTickets.length,
    data: {
      unAnsweredTickets,
    },
  });
});

// for reading one parrticular form GET
exports.readForm = catchAsync(async (req, res, next) => {
  const oneForm = await Form.findById(req.params.id);

  if (!oneForm) {
    return next(new ErrorResponse('no form found with such id', 404));
  }

  res.status(200).json({
    status: 'success',
    feedback: {
      allForm,
    },
  });
});

// for responding to responding to forms by resolver GET
exports.respondToForm = catchAsync(async (req, res, next) => {
  const response = await Form.findOneAndUpdate(
    req.params.id,
    {
      resolution: req.body.resolution,
      respondedBy: { toString: () => req.user.name },
      answered: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!response) {
    return next(new ErrorResponse('no tour found with such id', 404));
  }

  res.status(201).json({
    status: 'sucess',
    data: {
      response,
    },
  });
});
