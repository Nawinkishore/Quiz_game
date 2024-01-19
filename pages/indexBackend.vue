  <template>
    <div class=" h-screen w-full bg-yellow-300">
    <div v-if="currentqn < question.length" >
      <div class="text-center p-5  font-bold text-2xl"><h1>QUIZ GAME</h1></div>
      <p class="text-center mt-5 font-extrabold text-red-600">{{question}}</p>
    </div>
    <!-- <ul>
      <li v-for="(choice, index) in question[currentqn].choices" :key="index" class="flex justify-center" >
        <button class="mt-10 cursor-pointer text-blue-600  hover:text-white font-extrabold" @click="checkanswer(index)" :disabled ="selected" >{{ choice }}</button>
      </li>
    </ul>
      
    <div class="flex justify-center gap-5 mt-10" v-if="currentqn < question.length">
  <button  @click="previousqn()" v-if="currentqn > 0 " class="w-auto h-6 px-3 rounded-sm font-thin bg-white"
    :disabled="question[currentqn].answered">Previous Question</button>
  <button @click="nextquestion()" v-show="currentqn < question.length - 1"  class=" w-auto h-6 px-3 rounded-sm font-thin bg-white"
  >Next Question</button>
  <button v-if="currentqn === question.length - 1" @click="finishQuiz()" class="w-auto h-6 px-3 rounded-sm font-thin bg-black text-white">Finish</button>
</div>

    
    <p class="text-center mt-5">{{ selectedanswer }}</p>
    <p class="text-center">Your score : {{ correct }}</p> -->
    <!-- <p class="text-center ">Total question : {{ total }}</p> -->
  </div>
  </template>

  <script>
  export default {
    data() {
      return {
        question: [],
        currentqn: 0,
        selectedanswer:'',
        total:0,
        correct:0,
        selected : false,
      };
    },
    mounted(){
      this.getquestion();   
    },
    methods: {
      getquestion(){
        this.$http.$get('/api/').then((res)=>{
          console.log('API response :',res);
          this.question=res.list;
        });
      },
      checkanswer(index) {
        if (this.question[this.currentqn].correctAnswer === index) {
          this.selectedanswer = "Correct";
          this.correct++;
          this.selected=true;

        } else {
          this.selectedanswer="Incorrect";
          this.selected=true;  
        }
        
        
        
      
      },
      nextquestion(){
        this.currentqn++;
        this.selectedanswer='';
        this.selected=false;
      },
      previousqn(){
        if(this.currentqn > 0)
        {
          this.currentqn--;
          this.selectedanswer='';
          this.selected='';
        }
      },
      finishQuiz(){
        alert("Quiz finished"+ "Your score :"+this.correct)
      }
    },
    created() {
    this.total = this.question.length;
  },
  };
  </script>
