import mongoose from 'mongoose';

const { Schema } = mongoose;

const logEntrySchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

// * Log Entry


// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating - Scale of 1 - 10
// * Image - Text - URL
// * Start Date - DateTime
// * End Date - DateTime
// * Latitued - Number
// * Longitude - Number
// * Created At - DateTime
// * Updated At - DateTime
