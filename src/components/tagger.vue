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
      <h1 style="color:#1c2e5a">문장 분석 태깅</h1>
      <p>육하원칙으로 문장 나누기acn</p>
      <hr>

      <div class="examples row">
        <span v-for="(comments, index) in sentenceArrs">
          <div class="btn-ex" v-on:click="text_load(comments)">
            <center>
            <label class="btn-text btn"># {{comments}}</label>
            </center>
          </div>
        </span>
      </div>

      <div id="input">
          <textarea v-model="defaultSentence" ref="sa_query" placeholder="문장을 입력해주세요." v-on:keydown.49="get_who" v-on:keydown.50="get_when" v-on:keydown.51="get_where" v-on:keydown.52="get_what" v-on:keydown.53="get_how" v-on:keydown.enter="sa_send" v-on:keydown.delete.prevent="" onkeypress="return false"></textarea>
      </div>

    </div>
    <div class="container">
      <div id="output" >
        <div class="row">
        <label class="btn btn-primary btn-block btns" v-on:click="get_who" v-bind:style="{backgroundColor: buttonColors[0]}">누가</label>
        <textarea class="tarea" id="who_textarea" v-model="who_value"></textarea>
        </div>
        <div class="row">
        <label class="btn btn-primary btn-block btns" v-on:click="get_when" v-bind:style="{backgroundColor: buttonColors[1]}">언제</label>
        <textarea class="tarea" id="when_textarea" v-model="when_value"></textarea>
        </div>
        <div class="row">
        <label class="btn btn-primary btn-block btns" v-on:click="get_where" v-bind:style="{backgroundColor: buttonColors[2]}">어디서</label>
        <textarea class="tarea" id="where_textarea" v-model="where_value"></textarea>
        </div>
        <div class="row">
        <label class="btn btn-primary btn-block btns" v-on:click="get_what" v-bind:style="{backgroundColor: buttonColors[3]}">무엇을</label>
        <textarea class="tarea" id="where_textarea" v-model="what_value"></textarea>
        </div>
        <div class="row">
        <label class="btn btn-primary btn-block btns" v-on:click="get_how" v-bind:style="{backgroundColor: buttonColors[4]}">어떻게</label>
        <textarea class="tarea" id="how_textarea" v-model="how_value"></textarea>
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
      resultNumber :'',
      resultPosOrNeg:'',
      radius:20,
      sentenceArrs:['문재인 대통령이 5일 신혼부부를 위한 행복주택을 방문해 “내 집 마련을 위해 개인과 가족이 져온 큰 짐을 이제 국가가 나눠 지겠다”고 말했다.'],
      defaultSentence:"문재인 대통령이 5일 신혼부부를 위한 행복주택을 방문해 “내 집 마련을 위해 개인과 가족이 져온 큰 짐을 이제 국가가 나눠 지겠다”고 말했다.",
      who_value:"",
      when_value:"",
      where_value:"",
      what_value:"",
      how_value:"",
      buttonColors:['#428bca','#428bca','#428bca','#428bca','#428bca'],
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

        });

        //window.location.hash = "#sentimentanalysis";

      }else{
        $("#warningDialog").modal();
              setTimeout(function(){$("#warningDialog").modal("hide");}, 1500);
      }
    },
    make_blue_buttons(position){
      for(var i=0; i<5; i++){
        if(i != position){
          this.buttonColors[i] = '#428bca';
        }else{
          this.buttonColors[position] = '#5cb85c';
        }
      }
    },
    text_load(comments_query){
      this.$refs.sa_query.value = comments_query;
      this.sa_send();
    },
    get_who(){
      var focus = "who";
      this.get_selected(focus);
      this.make_blue_buttons(0);
    },
    get_when(){
      var focus = "when";
      this.get_selected(focus);
      this.make_blue_buttons(1);
    },
    get_where(){
      var focus = "where";
      this.get_selected(focus);
      this.make_blue_buttons(2);
    },
    get_what(){
      var focus = "what";
      this.get_selected(focus);
      this.make_blue_buttons(3);
    },
    get_how(){
      var focus = "how";
      this.get_selected(focus);
      this.make_blue_buttons(4);
    },
    get_selected(focus){
      // get selected text temporarily store in who_textarea
      var selectedText = '';
      if (window.getSelection) {
        selectedText = String(window.getSelection());
      } else if (document.getSelection) {
        selectedText = String(document.getSelection());
      } else if (document.selection) {
        selectedText = String(document.selection.createRange().text);
      };
      if(focus=="who"){
        this.who_value = selectedText;
      }else if(focus=="when"){
        this.when_value = selectedText;
      }else if(focus=="where"){
        this.where_value = selectedText;
      }else if(focus=="what"){
        this.what_value = selectedText;
      }else if(focus=="how"){
        this.how_value = selectedText;
      }
    }
  },
}


</script>

<style scoped>
@import url(bootstrap/dist/css/bootstrap.css);
@import url(bootstrap-vue/dist/bootstrap-vue.css);

@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);
@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');

.btn-ex{
  min-width: 150px;
  padding-left: 10px;
  padding-right:10px;
  background-color: #2196F3;
  border-radius: 20px;
  margin: 15px 20px 15px 20px;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

}
.btn-ex:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.btn-text{
  padding:10px 5px 5px 5px;
  color:white;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 13px;
  font-weight: bold;
}

.btns{
  padding:10px 5px 5px 5px;
  color:white;
  border-color: white;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
  font-weight: bold;
  width:100px;
}

.number{
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;

}

.tarea{
  margin-left: 15px;
  padding:7px;
  font-size: 1.5rem;
  border-style: solid;
  border-color: #2196F3;
  border-radius: 5px;
  overflow: auto;
  width: 800px;
  height:45px;
  font-family: 'Jeju Gothic', sans-serif;
  line-height: 100%;
}


.outer-container{
  width: 60%;
  margin: auto;
}


#output {
  margin-left:20px;
  margin-right:20px;
  margin-top:50px;
  font-family: 'Source Sans Pro', sans-serif;
}
#output .col-md-2{
align-self:center;
}

#output .header{
  font-weight: bold;
  margin-bottom: 10px;

}

#sa-result-btn {
  color: white;
  font-family: 'Source Sans Pro', 'Jeju Gothic', sans-serif;
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
  margin-top:10px;
}
#input textarea {
  display: block;
  padding: 0.125rem 0.125rem 0.0625rem;
  font-size: 2rem;
  border-style: none;
  border-color: Transparent;
  overflow: auto;
  width: 100%;
  font-family: 'Jeju Gothic', sans-serif;
  line-height: 200%;
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


#result-sentence{
  padding: 5px;
  border-style:solid;
  border-width: 2px;
  border-color: CornFlowerBlue;
  border-radius: 8px;
  font-weight: normal;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 13px;

}
</style>
