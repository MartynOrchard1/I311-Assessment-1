<template>
    <div class="card p-4">
      <h2 class="text-center">Quiz Complete!</h2>
      <h3 class="text-center">
        You scored {{ score }} out of {{ questions.length }}
      </h3>
  
      <div class="mt-4">
        <h4>Review:</h4>
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="mb-3"
        >
          <p><strong>Q{{ index + 1 }}: {{ question.question }}</strong></p>
          <p>Your Answer: {{ formatAnswer(userAnswers[index]) }}</p>
          <p>Correct Answer: {{ formatAnswer(question.correctAnswer) }}</p>
          <hr />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      questions: Array,
      userAnswers: Array
    },
    computed: {
      score() {
        let correct = 0;
        this.questions.forEach((question, index) => {
          if (this.userAnswers[index] === question.correctAnswer) {
            correct++;
          }
        });
        return correct;
      }
    },
    methods: {
      formatAnswer(answer) {
        // Handles boolean answers (true/false) nicely
        if (typeof answer === 'boolean') {
          return answer ? 'True' : 'False';
        }
        return answer;
      }
    }
  };
  </script>
  