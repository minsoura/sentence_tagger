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
    <div id="tagger">
      <h1 style="color:#1c2e5a">문장 분석 태깅</h1>
      <p>육하원칙으로 문장 나누기acn</p>
      <hr>

     
    <div class="upper_container">
      <div class="backdrop">
        <div class="highlights"></div>
      </div>
      <div id="input">
          <textarea autofocus id="mainTextArea" v-model="viewSentence" ref="mainText" placeholder="문장을 입력해주세요." onkeypress="return false" v-on:keydown.r="skip" v-on:keydown.enter="next" v-on:keydown.a="get_who" v-on:keydown.s="get_when" v-on:keydown.d="get_where" v-on:keydown.f="get_what" v-on:keydown.g="get_how" v-on:keydown.space="erase" v-on:keydown.delete.prevent="" ></textarea>
      </div>


    </div>
    </div>
    <div class="control_boxes" style="marginTop:225px; float:right; ">
      <label class="skip_or_next" v-on:click="skip">넘기기</label>
      <label class="skip_or_next" v-on:click="next">제출하기</label>
    </div>

    <div class="container" style="margin-top:310px;">
      <div id="output" >
        <div class="row">
          <label class="btn btn-primary btn-block btns" v-on:click="get_who" v-bind:style="{backgroundColor: buttonColors[0]}">누가 (a)</label>
          <textarea class="tarea" id="who_textarea" v-model="whoValue"></textarea>
          <div class="form-check">
          <input type="checkbox" class="form-check-input" id="whoCheckBox" @click="check_box($event)" value="option1" name="radios">
          <label class="form-check-label" for="whoCheckBox">인용구 여부</label>
          </div>
        </div>

        <div class="row">
          <label class="btn btn-primary btn-block btns" v-on:click="get_when" v-bind:style="{backgroundColor: buttonColors[1]}">언제 (s)</label>
          <textarea class="tarea" id="when_textarea" v-model="whenValue"></textarea>
          <div class="form-check">
          <input type="checkbox" class="form-check-input" id="whenCheckBox"  @click="check_box($event)" value="option2" name="radios">
          <label class="form-check-label" for="whenCheckBox">인용구 여부</label>
          </div>
        </div>

        <div class="row">
          <label class="btn btn-primary btn-block btns" v-on:click="get_where" v-bind:style="{backgroundColor: buttonColors[2]}">어디서 (d)</label>
          <textarea class="tarea" id="where_textarea" v-model="whereValue"></textarea>
          <div class="form-check">
          <input type="checkbox" class="form-check-input" id="whereCheckBox"  @click="check_box($event)" value="option3" name="radios">
          <label class="form-check-label" for="whereCheckBox">인용구 여부</label>
          </div>
        </div>

        <div class="row">
          <label class="btn btn-primary btn-block btns" v-on:click="get_what" v-bind:style="{backgroundColor: buttonColors[3]}">무엇을 (f)</label>
          <textarea class="tarea" id="where_textarea" v-model="whatValue"></textarea>
          <div class="form-check">
          <input type="checkbox" class="form-check-input" id="whatCheckBox"  @click="check_box($event)" value="option4" name="radios">
          <label class="form-check-label" for="whatCheckBox">인용구 여부</label>
          </div>
        </div>

        <div class="row">
          <label class="btn btn-primary btn-block btns" v-on:click="get_how" v-bind:style="{backgroundColor: buttonColors[4]}">어떻게 (g)</label>
          <textarea class="tarea" id="how_textarea" v-model="howValue"></textarea >
          <div class="form-check">
          <input type="checkbox" class="form-check-input" id="howCheckBox"   @click="check_box($event)" value="option5" name="radios">
          <label class="form-check-label" for="howCheckBox">인용구 여부</label>
          </div>
        </div>

        <div class="row" v-if="quotesPresent">
        <label class="btn btn-primary btn-block btns" v-on:click="get_how" v-bind:style="{backgroundColor: 	'#F08080'}">인용구 (자동)</label>
        <textarea class="tarea" id="quotes_textarea" v-model="quotesValue"></textarea>
        </div>

        <div class="row">
        <label class="btn btn-primary btn-block btns" v-bind:style="{backgroundColor: '#BDBDBD'}">메모</label>
        <textarea class="tarea" id="memo_textarea" v-model="memoValue"></textarea>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>
<script>
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'highlight-within-textarea'


export default{
  beforeMount(){
    console.log("beforeMounted activated");
    this.load_sentence();
  },
  mounted(){
    console.log("mounted activated");
  },
  created(){
    console.log("created activated");
  },
  beforeUpdated(){
    console.log("beforeUpdated activated");
  },
  updated(){
    console.log("updated activated");
  },

  data(){
    return {
      name:'Sentence Tagging - 5W1H',
      sentenceId:"",
      quotesId:"",
      searchTerm:'',
      resultNumber :'',
      resultPosOrNeg:'',
      radius:20,
      sentenceArrs:['문재인 대통령이 5일 신혼부부를 위한 행복주택을 방문해 “내 집 마련을 위해 개인과 가족이 져온 큰 짐을 이제 국가가 나눠 지겠다”고 말했다.'],
      originalSentence:'test',
      viewSentence:'',
      whoValue:"",
      whenValue:"",
      whereValue:"",
      whatValue:"",
      howValue:"",
      quotesValue:"",
      memoValue:"",
      buttonColors:['#d0bfff', '#ffec99', '#ffc9c9','#33FFBE','#a3daff'],
      highlightColors:['#d0bfff', '#ffec99', '#ffc9c9','#33FFBE','#a3daff'],
      checkBoxIds:['whoCheckBox', 'whenCheckBox', 'whereCheckBox', 'whatCheckBox','howCheckBox'], //checkbox or radios
      wordsSelected:['','','','',''],
      selectedText:'',
      currentWordsIndex:0, //현재 focus가 맞춰진 wordsSelected의 index
      quotesPresent:false,
    }
  },
  watch:{
    viewSentence: function() {
      this.viewSentence = String(this.originalSentence);
    }
  },
 	methods: {
    keep(event){
      this.viewSentence = String(this.originalSentence);
      console.log("changed detected");
      this.$emit("change",event);
    },
    check_box(event){
      var targetId = event.currentTarget.id;
      var radio = document.getElementById(targetId);
      var focusNumber = -1;
      var status = radio.checked;
      var tmpCheckPresent = false;

      for(var i=0; i<this.checkBoxIds.length; i++){
        var radio_i = document.getElementById(this.checkBoxIds[i]);
        if (radio_i.checked == true) {
          if(this.wordsSelected[i]==''){
            radio_i.checked = false;
          }else{
            tmpCheckPresent = true;
            focusNumber =i;
          }
        };
      }
      console.log("quotes:" + this.quotesPresent);
      if(tmpCheckPresent){
        this.quotesValue = this.wordsSelected[focusNumber];
        this.quotesId = String(this.sentenceId) + '_' + String(focusNumber);
        console.log(this.quotesValue);
        this.quotesPresent = true;
      } else {
        // uncheck 되는 경우
        this.quotesPresent = false;
        this.quotesValue = '';
        this.quotesId = '';
      };
    },
    uncheck_all_boxes(){
      for (var i=0; i<this.checkBoxIds.length; i++) {
        var radio_i = document.getElementById(this.checkBoxIds[i]);
        if (radio_i.checked == true) {
          radio_i.checked = false;
        };
      };
    },
    skip(){
      console.log("skipfunction");
      this.load_sentence();

      //save and bring next sentence
    },
    next(){
      console.log("next_function_called");
      this.save_tag();
      if (this.quotesPresent === true) {
        // 인용구로 update 하기
        var new_sentence = String(this.quotesValue);
        var new_id = String(this.quotesId);
        this.initialize_selection();
        this.originalSentence = String(new_sentence);
        this.viewSentence = String(new_sentence);
        this.sentenceId = new_id;
        console.log("if next");
        this.words_highlights();
      } else {
        this.initialize_selection(); // 기존에 입력되었던 것 초기화 필요
        this.load_sentence();
        console.log("else next");
      };
    },
    words_highlights() {
      var text = this.originalSentence;
      var patternOne = /".*?"/g;
      var patternTwo = /“.*?”/g;
      var patternThree = /'.*?'/g;
      var stringsInQuotes;

      if((stringsInQuotes = patternTwo.exec(text)) || (stringsInQuotes =patternOne.exec(text)) || (stringsInQuotes =patternThree.exec(text))){
          this.quotesPresent = true;
          this.quotesValue = stringsInQuotes.subString(1, stringsInQuotes.length-1)
          this.quotes_id = this.sentenceId + "_5";
      }

      for(var i=0; i<this.wordsSelected.length; i++){
          text = text
                    .replace(/\n$/g, '\n\n')
                    .replace(this.wordsSelected[i], '<mark style="background-color:'+ this.highlightColors[i] +'">$&</mark>');
      }
      $('.highlights').html(text);
    },
    erase_highlights(){
      var text = $('#mainTextArea').val();
      for(var i=0; i<this.wordsSelected.length; i++){
          if(i==this.currentWordsIndex){
            text = text
                      .replace(/\n$/g, '\n\n')
                      .replace(this.wordsSelected[i], '<mark style="background-color:'+ 'transparent' +'">$&</mark>');
          }else{
            text = text
                      .replace(/\n$/g, '\n\n')
                      .replace(this.wordsSelected[i], '<mark style="background-color:'+ this.highlightColors[i] +'">$&</mark>');
          }
      }
      $('.highlights').html(text);

    },
    change_words(number){
      for(var i=0; i<this.wordsSelected.length; i++){
        if(this.wordsSelected[i] == this.selectedText && i!=number){
          this.wordsSelected[i] = '';
          this.empty_values_in_textarea(i);
        }
      }
      this.wordsSelected[number] = this.selectedText;
      this.words_highlights();
      console.log("words_selected" + this.wordsSelected[number]);
    },
    load_sentence(){
      var textValue='';
      this.$http.get('http://192.168.182.195:51112/proxy/tag_read/')
                .then(response => {
                var raw_string = response.data;
                console.log(raw_string); // ex: {"sentence_text":"창조관은 대학의 중심에 위치해 방송문화예술대학 실습실 및 강의실로 이용할 예정이다.","sentence_id":"5-13"}
                this.sentenceId = raw_string.sentence_id;
                this.originalSentence = String(raw_string.sentence);
                this.viewSentence = String(raw_string.sentence);
                this.words_highlights();
      });

    },
    save_tag(){
      var save_data = this.get_save_data();
      this.$http.get('http://192.168.182.195:51112/proxy/tag_save/', {params:{save_data:JSON.stringify(save_data)}})
                .then(response => {console.log(response.data)});
    },
    get_focus(focus){
      //refactoring 할때 쓸것
    },

    get_who(){
      var focus = "who";
      this.get_selected(focus);
    },
    get_when(){
      var focus = "when";
      this.get_selected(focus);
    },
    get_where(){
      var focus = "where";
      this.get_selected(focus);
    },
    get_what(){
      var focus = "what";
      this.get_selected(focus);
    },
    get_how(){
      var focus = "how";
      this.get_selected(focus);
    },
    erase(){
      var focus = "erase";
      this.get_selected(focus); // 지울 부분을 정확하게 드래그해야할것..현재로썬
    },
    empty_values_in_textarea(number){
      if(number==0){
        this.whoValue = '';
      }else if(number==1){
        this.whenValue = '';
      }else if(number==2){
        this.whereValue = '';
      }else if(number==3){
        this.whatValue = '';
      }else if(number==4){
        this.howValue = '';
      }
    },
    put_words_values(focus, input_string){
      var number = 0;
      if(focus=="who"){
        this.whoValue = input_string;
        number = 0;
      }else if(focus=="when"){
        this.whenValue = input_string;
        number = 1;
      }else if(focus=="where"){
        this.whereValue = input_string;
        number = 2;
      }else if(focus=="what"){
        this.whatValue = input_string;
        number = 3;
      }else if(focus=="how"){
        this.howValue = input_string;
        number = 4;
      }else if(focus=="erase"){ // 먼저 일치하는 부분에 해당하는 wordsSelected 배열의 인덱스 값을 찾아주어야 함..
        for(var i=0; i<this.wordsSelected.length; i++){
          if(this.wordsSelected[i] == this.selectedText){
            this.currentWordsIndex = i;
            this.erase_highlights();
            this.wordsSelected[i] = '';
            this.empty_values_in_textarea(i);
            return;
          }
        }
      }
      this.change_words(number);
    },
    get_selected(focus){
      // get selected text temporarily store in who_textarea
      var tempText = '';
      var number = 0;
      if (window.getSelection) {
        tempText = String(window.getSelection());
      } else if (document.getSelection) {
        tempText = String(document.getSelection());
      } else if (document.selection) {
        tempText = String(document.selection.createRange().text);
      };
      tempText = tempText.trim();
      this.selectedText = tempText; //duplicate_check 에서 사용하기 위해 필요
      if(tempText !=''){
        console.log("tempText" +tempText);
        this.put_words_values(focus, tempText);
      }
    },
    printArray(){
      for(var i=0; i<5; i++){
        console.log(i +":" + this.wordsSelected[i]);
      }
    },
    get_save_data(){
      var save_data = {
        sentence_text :this.originalSentence,
        sentence_id : this.sentenceId,
        quotes_id : this.quotesId,
        who_value: this.whoValue,
        when_value: this.whenValue,
        where_value: this.whereValue,
        what_value: this.whatValue,
        how_value: this.howValue,
        quotes_value: this.quotesValue,
        memo_value: this.memoValue,
        quotes_present: this.quotesPresent,
      };
      return save_data;
    },
    initialize_selection() {
      this.uncheck_all_boxes(); // reset checkbox
      this.quotesId="";
      this.searchTerm='';
      this.resultNumber ='';
      this.resultPosOrNeg='';
      this.originalSentence='';
      this.viewSentence='';
      this.whoValue="";
      this.whenValue="";
      this.whereValue="";
      this.whatValue="";
      this.howValue="";
      this.quotesValue="";
      this.memoValue="";
      this.wordsSelected = ['','','','',''];
      this.selectedText= '';
      this.currentWordsIndex = 0; //현재 focus가 맞춰진 wordsSelected의 index
      this.quotesPresent = false;
    },
  },
}


</script>

<style scoped>
@import url(bootstrap/dist/css/bootstrap.css);
@import url(bootstrap-vue/dist/bootstrap-vue.css);
@import url(highlight-within-textarea/jquery.highlight-within-textarea.css);

@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);
@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
@import url(https://fonts.googleapis.com/css?family=Open+Sans);


.form-check{
  margin-top:12px;
  margin-left:12px;
    font-family: 'Nanum Gothic', sans-serif;
}
.control_boxes{
  color:black;
}

.skip_or_next{
  font-weight:bold;
  font-size:25px;
  margin-right:20px;

}

.skip_or_next:hover{
  font-weight:bold;
  font-size:25px;
  margin-right:20px;
  color:#2196F3;

}
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
  color:rgb(32,32,32);
  border-color: white;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
  font-weight: bold;
  width:150px;
}

.number{
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;

}

.tarea{
  margin-left: 15px;
  padding:7px;
  font-size: 1rem;
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



#tagger {
  margin-left:20px;
  margin-right:20px;
  margin-top:10;
  font-family: 'Source Sans Pro', 'Jeju Gothic', sans-serif;
}

#tagger h1 {
  display:inline;
  margin-right: 10px;
}
#input{
  margin-top:10px;
}
#input textarea {
  display: block;
  padding: 0.125rem 0.125rem 0.0625rem;
  font-family: 'Jeju Gothic', sans-serif;
  font-size: 1.2rem;
  line-height: 200%;

  border-style: none;
  border-color: Transparent;
  width: 100%;

  z-index: 2;
  background-color: transparent;
  position: absolute;
  overflow: auto;
  min-height:200px;
}

#input label{
  margin-top:10px;
}

#tagger p {
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

.highlights, textarea {

}

.upper_container {
  display: block;
  margin: 0 auto;
  transform: translateZ(0);
  -webkit-text-size-adjust: none;
}

.backdrop {

  position: absolute;
  z-index: 1;
  border: 2px solid #685972;
  width:100%;
  background-color: #fff;
  overflow: auto;
  pointer-events: none;
  transition: transform 1s;
}

.highlights {
  font-family: 'Jeju Gothic', sans-serif;
  font-size: 1.2rem;
  line-height: 200%;
  min-height: 200px;
	white-space: pre-wrap;
	word-wrap: break-word;
	color: black;
}



mark {
  border-radius: 3px;
  color: transparent;
  background-color: #b1d5e5;
}






</style>
