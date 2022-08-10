const mongoose = require('mongoose');

const TimeTableSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },

  sessionType: {
    type: String,
    required: true,
  },

  empName: {
    type: String,
    required: true,
  },
  empNo: {
    type: String,
    required: true,
  },
  /* slotID: {
    type: Schema.Types.ObjectId,
    required: true,
  }, */
});

module.exports = Timetable = mongoose.model('TimeTable', TimeTableSchema);
