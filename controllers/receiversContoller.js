// enum: ['AM', 'Team Lead', 'IT', 'Engineering', 'Management'],
const Form = require('../models/formModels');
const catchAsync = require('../utils/catchAsync');
const ErrorResponse = require('../utils/catchAsync');

//Team leads(get att tickects, get a ticket, respond to tickeds)
exports.teamLeadAll = catchAsync(async (req, res, next) => {
  const teamLeadIssues = await Form.find({ to: 'Team Lead' })
    .select(['-__v'])
    .populate('ratings')
    .sort('-dateSubmited');

  res.status(200).json({
    status: 'success',
    results: teamLeadIssues.length,
    data: {
      teamLeadIssues,
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
  const response = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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
