const mongoose = require("mongoose");


const mcqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  option1: {
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  option2: {
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  option3: {
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  option4: {
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }
});

// Create the model
const MCQ = mongoose.model("MCQ", mcqSchema);

module.exports = MCQ;