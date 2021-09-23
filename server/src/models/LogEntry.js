import mongoose from 'mongoose';

const { Schema } = mongoose;

// create variable
const requriedString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema({
  title: requriedString, // String is shorthand for {type: String}
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,
  },
}, {
  timestamps: true,
});

const logEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = logEntry;