<template>
  <div class="container mt-5">
    <h1 class="text-center">{{ quizData.title }}</h1>

    <!-- Show the quiz questions while not finished -->
    <div v-if="!showResult">
      <p class="text-center">
        Question {{ currentQuestionIndex + 1 }} of {{ quizData.questions.length }}
      </p>

      <!-- Render the current Question component -->
      <Question
        :question="quizData.questions[currentQuestionIndex]"
        :user-answer="userAnswers[currentQuestionIndex]"
        @answered="handleAnswer"
      />

      <!-- Navigation buttons -->
      <div class="d-flex justify-content-between mt-3">
        <button
          class="btn btn-secondary"
          @click="goPrevious"
          :disabled="currentQuestionIndex === 0"
        >
          Previous
        </button>

        <button
          class="btn btn-primary"
          @click="goNext"
        >
          {{ currentQuestionIndex === quizData.questions.length - 1 ? 'Finish' : 'Next' }}
        </button>
      </div>
    </div>

    <!-- Show results once the quiz is finished -->
    <div v-else>
      <Result :questions="quizData.questions" :user-answers="userAnswers" />
    </div>
  </div>
</template>

<script>
// Import quiz data and components
import quizData from '../data/quizData.json';
import Question from './Question.vue';
import Result from './Result.vue';

export default {
  components: {
    Question,
    Result
  },
  data() {
    return {
      // Store the quiz data
      quizData,
      // Track which question the user is on
      currentQuestionIndex: 0,
      // Array to store user's answers
      userAnswers: Array(quizData.questions.length).fill(null),
      // Flag to show results
      showResult: false
    };
  },
  methods: {
    // Save the user's selected answer
    handleAnswer(answer) {
      this.userAnswers.splice(this.currentQuestionIndex, 1, answer); // Use splice for reactivity
    },
    // Navigate to the previous question
    goPrevious() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    // Navigate to the next question or finish the quiz
    goNext() {
      if (this.userAnswers[this.currentQuestionIndex] === null) {
        alert('Please select an answer before proceeding.');
        return;
      }

      if (this.currentQuestionIndex + 1 < this.quizData.questions.length) {
        this.currentQuestionIndex++;
      } else {
        if (this.userAnswers.includes(null)) {
          alert('Please answer all questions before finishing.');
        } else {
          this.showResult = true;
        }
      }
    }
  }
};
</script>
