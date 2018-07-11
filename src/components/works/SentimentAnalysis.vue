<template>
<div>
  <div class="modal fade" id="warningDialog" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style="color:#428bca">Error</h5>
        <button type="button" class="close" data-dismiss="modal" >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        문장을 입력해주세요.
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>

  <div class="outer-container">
    <div id="sentimentanalysis">
      <h1 style="color:#1c2e5a">Sentiment Analysis</h1>
      <p>댓글 문장의 긍부정 판별</p>
      <hr>
      <div id="input">
          <textarea v-model="sentence" ref="sa_query" placeholder="문장을 입력해주세요." v-on:keydown.enter="sa_send"></textarea>
          <label class="btn btn-primary btn-block" v-on:click="sa_send">판별</label>
      </div>
    </div>
    <div class="container" v-if="resultShow">
      <div id="output" >
        <div class="header">RESULT:</div>
        <div class="row" v-for="(inputString, index) in inputStringArr" style="margin-bottom:10px;">
        <div class="col-md-7" id="result-sentence" >
        {{inputString }}
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-2"  v-bind:style="{backgroundColor: buttonColors[index], borderRadius:radius + 'px'}"><center><div id ="sa-result-btn" style="padding:5px; ">{{posOrNotArr[index]}}</div></center></div>
        <div class="col-md-2" ><center><div>{{numberArr[index]}}</div></center></div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>
<script>
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'

export default{

  data(){
    return {
      name:'Sentiment Analysis',
      sentence:"",
      searchTerm:'',

      resultShow : false,
      resultSentence:"",
      resultNumber :'',
      resultPosOrNeg:'',
      radius:20,
      buttonColors :[],
      inputStringArr:[],
      posOrNotArr:[],
      numberArr:[],
    }
  },
 	methods: {
    sa_send(){
      console.log("queried");
      console.log(this.$refs.sa_query.value);
      var positive_or_not = '';
      var number = 0;
      var korean_pos_or_not ='';
      if(this.$refs.sa_query.value.trim()){
        this.$http.get('http://localhost:11111/proxy/sa/' + this.$refs.sa_query.value)
                  .then(response => {
                  var raw_string = response.data;
                  positive_or_not = raw_string.split('/')[0];
                  number = raw_string.split('/')[1];
                  number = number * 100;

                  if(positive_or_not.trim()== "NEG"){
                    this.buttonColors.push ('#d9534f');
                    korean_pos_or_not = "부정";
                  }else if(positive_or_not.trim()== "POS"){
                    this.buttonColors.push('#5cb85c');
                    korean_pos_or_not = "긍정";
                  }else if(positive_or_not.trim()== "NEU"){
                    this.buttonColors.push('#428bca');
                    korean_pos_or_not ="중립";
                  }
                  this.resultPosOrNeg = korean_pos_or_not;
                  this.posOrNotArr.push(korean_pos_or_not);
                  this.numberArr.push(number.toFixed(3).toString() +" %");
        });
        this.resultSentence = this.$refs.sa_query.value;
        this.inputStringArr.push(this.$refs.sa_query.value);
        this.resultShow = true;
        window.location.hash = "#sentimentanalysis";

      }else{
        $("#warningDialog").modal();
              setTimeout(function(){$("#warningDialog").modal("hide");}, 1500);
      }
      }
    },
}


</script>

<style scoped>
@import url(bootstrap/dist/css/bootstrap.css);
@import url(bootstrap-vue/dist/bootstrap-vue.css);

@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);

.outer-container{
  width: 60%;
  margin: auto;
}

#result-sentence{
  border-style:solid;
  border-width: 2px;
  border-color: CornFlowerBlue;
  border-radius: 8px;
}
#output {
  margin-left:20px;
  margin-right:20px;
  margin-top:50px;
  font-family: 'Source Sans Pro', 'Jeju Gothic', sans-serif;
}
#output .col-md-2{
align-self:center
}

#output .header{
  font-weight: bold;
  margin-bottom: 10px;

}

#sa-result-btn {
  color: white;

}

#sa-score {
  font-size: 20px;
}



#sentimentanalysis {
  margin-left:20px;
  margin-right:20px;
  margin-top:100px;
  font-family: 'Source Sans Pro', 'Jeju Gothic', sans-serif;
}

#sentimentanalysis h1 {
  display:inline;
  margin-right: 10px;
}
#input{
}
#input textarea {
  display: block;
  padding: 0.125rem 0.125rem 0.0625rem;
  font-size: 1rem;
  border-width: medium;
  border-color: CornFlowerBlue;
  border-radius: 8px;
  line-height: 1.9;
  width: 100%;
  font-family: 'Source Sans Pro', 'Jeju Gothic', sans-serif;
  height:200px;
}

#input label{
  margin-top:10px;
}

#sentimentanalysis p {
  display:inline;
  color:#797979;
}

#divider{
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
