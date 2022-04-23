const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const ErrorResponse = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  if (!allUsers) {
    return next(new ErrorResponse('There are no users to see yet', 404));
  }

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      allUsers,
    },
  });
});
