import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: {
    type: String
  },
  author: {type: String},
  genre: {type: String},
  read: {type: Boolean, default: false}
});

let Book = mongoose.model('Book', BookSchema);

export default Book;