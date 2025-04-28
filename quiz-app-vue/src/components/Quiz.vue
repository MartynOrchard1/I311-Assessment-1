<template>
  <div class="container mt-5">
    <h1 class="text-center">{{ quizData.title }}</h1>

    <div v-if="!showResult">
      <p class="text-center">
        Question {{ currentQuestionIndex + 1 }} of {{ quizData.questions.length }}
      </p>

      <Question
        :question="quizData.questions[currentQuestionIndex]"
        :user-answer="userAnswers[currentQuestionIndex]"
        @answered="handleAnswer"
      />

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

    <div v-else>
      <Result :questions="quizData.questions" :user-answers="userAnswers" />
    </div>
  </div>
</template>

<script>
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
      quizData,
      currentQuestionIndex: 0,
      userAnswers: Array(quizData.questions.length).fill(null),
      showResult: false
    };
  },
  methods: {
    handleAnswer(answer) {
      this.$set(this.userAnswers, this.currentQuestionIndex, answer);
    },
    goPrevious() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
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

