var mongoose = require('mongoose');
var ConferenceSchema = new mongoose.Schema({
  session: String,
  picture: String,
  speaker: String,
  title: String,
  upvotes: {type: Number, default: 0},
});
ConferenceSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Conference', ConferenceSchema);
