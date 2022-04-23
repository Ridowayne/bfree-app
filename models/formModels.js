const req = require('express/lib/request');
const mongoose = require('mongoose');

const Review = require('./reviewModels');

const formSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    bfreeID: {
      type: String,
    },
    to: {
      type: String,
      enum: ['Engineering', 'HR', 'Operations & TL', 'IT', 'Management'],
      required: [true, 'Kindly fill who to direct your feedback to'],
    },
    subject: {
      type: String,
      required: [
        true,
        'Kindly fill in the subject of what you wish to give feedback for',
      ],
    },
    body: {
      type: String,
      required: [true, 'Please provide information on your feedback'],
    },
    datesubmited: {
      type: Date,
      default: Date.now,
    },
    respondedBy: {
      type: String,
    },
    dateResolved: {
      type: Date,
    },
    answered: {
      type: Boolean,
      default: false,
    },
    resolution: {
      type: String,
    },
    stars: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    timeToResolve: {
      type: Number,
    },
    ratings: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Ratings',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

formSchema.pre('findOneAndUpdate', function (next) {
  this.set({ dateResolved: new Date() });

  next();
});

formSchema.pre('findOneAndUpdate', function (next) {
  this.set({ answered: true });

  next();
});

formSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'ratings',
    select: '-__v',
  });

  next();
});

// formSchema.pre('findOneAndUpdate', function (next) {
//   this.set({
//     timeToResolve: this.datesubmited - this.dateResolved / 1000 / 60,
//   });

//   next();
// });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
