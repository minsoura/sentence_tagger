<template>

<div>
  <!-- <div class="modal fade" id="warningDialog" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
      <p>육하원칙으로 문장 나누기</p>
      <hr>


    <div class="upper_container">
      <div class="backdrop">
        <div class="highlights"></div>
      </div>
      <div id="input">
          <textarea autofocus id="mainTextArea" v-model="viewSentence" ref="mainText" placeholder="문장이 자동 입력됩니다." onkeypress="return false" v-on:keydown.r="next" v-on:keydown.enter="load_sentence" v-on:keydown.a="get_who" v-on:keydown.s="get_when" v-on:keydown.d="get_where" v-on:keydown.f="get_what" v-on:keydown.g="get_how" v-on:keydown.space="erase" v-on:keydown.delete.prevent="" ></textarea>
      </div>


    </div>
    </div>

     <div class="display_box row" style="marginTop:225px; float:left; marginLeft:23px; display:block ">
      <div class="display_section">{{"문장 ID: " +  sentenceId}}</div>
      <div class="display_section">{{"문장 제출 수: " + submitCounter }}</div>
    </div>

    <div class="control-box" style="marginTop:225px; float:right; ">
      <label class="prev_or_next" v-on:click="prev" v-if="false">이전</label>
      <label class="prev_or_next" v-on:click="next">다음</label>
      <label class="prev_or_next" v-on:click="load_sentence">제출하기</label>
    </div>

    <div class="container" style="margin-top:310px; width:100%">
      <div id="output" >
        <div class="row">
          <div class="col-md-5 g_result">

          </div>
            <div class="col-md-7 g_result_summary" style="marginTop:20px;"></div>
        </div> -->

        <!--
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
        <label class="btn btn-primary btn-block btns" v-bind:style="{backgroundColor: 	'#F08080'}">인용구 (자동)</label>
        <textarea class="tarea" id="quotes_textarea" v-model="quotesValue"></textarea>
        </div>

        <div class="row">
        <label class="btn btn-primary btn-block btns" v-bind:style="{backgroundColor: '#BDBDBD'}">메모</label>
        <textarea class="tarea" id="memo_textarea" v-model="memoValue"></textarea>
        </div>
      -->




      <!-- </div>
    </div>
  </div> -->
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
      prevSentenceId:'',
      quotesId:"",
      searchTerm:'',
      radius:20,
      sentenceArrs:['문재인 대통령이 5일 신혼부부를 위한 행복주택을 방문해 “내 집 마련을 위해 개인과 가족이 져온 큰 짐을 이제 국가가 나눠 지겠다”고 말했다.'],
      originalSentence:'문재인 대통령이 5일 신혼부부를 위한 행복주택을 방문해 “내 집 마련을 위해 개인과 가족이 져온 큰 짐을 이제 국가가 나눠 지겠다”고 말했다.',
      viewSentence:'문재인 대통령이 5일 신혼부부를 위한 행복주택을 방문해 “내 집 마련을 위해 개인과 가족이 져온 큰 짐을 이제 국가가 나눠 지겠다”고 말했다.',
      previousSentence:'',
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
      submitCounter:0,
      googleResultEnt:"",
      googleResultSyn:"",
      googleSummary:"",
      textCutBySpaces:[''],
      previousSubject:"",
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
        //console.log('q2'+this.quotesId);
        console.log(this.quotesValue);
        this.quotesPresent = true;
      } else {
        // uncheck 되는 경우
        this.quotesPresent = false;
        this.quotesValue = '';
        this.quotesId = '';
        //console.log('q3'+this.quotesId);
        console.log("uncheck triggered.....");
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
    prev(){
      this.initialize_selection();
      this.viewSentence = this.previousSentence;
      this.sentenceId = this.prevSentenceId;
    },
    next(){
      console.log("next_function");
      this.initialize_selection();
      this.load_sentence();

      //save and bring next sentence
    },//
    google_submit_entity(){
      var sentence = String(this.viewSentence);
      var result = [];
      var lineBreak = "<br>";
      var boldLeft ='<div style="display:inline-block;border-radius:5px; padding:5px;color:white; font-weight:bold; background-color:';
      var color="";
      var boldLeftClose ='" >'
      var color ="";
      var boldRight ='</div>';
      this.$http.get('http://192.168.182.195:11112/proxy/google_nlp_entity/', {params:{text_value:sentence}})
                .then(response => {
                    result = response.data;
                    this.googleResultEnt = "";
                    result.forEach(entity => {
                      this.googleResultEnt += lineBreak;
                      this.googleResultEnt += boldLeft;

                      if(entity.type =="PERSON"){
                        color ="DodgerBlue";
                      }else if(entity.type =="EVENT"){
                        color ="Orange";
                      }else if(entity.type =="LOCATION" || entity.type =="ORGANIZATION"){
                        color ="MediumSeaGreen";
                      }else if(entity.type =="OTHER"){
                        color ="Gray";
                      }else if(entity.type =="CONSUMER_GOOD"){
                        color ="SlateBlue";
                      }else if(entity.type =="WORK_OF_ART"){
                        color ="Tomato";
                      }
                      this.googleResultEnt += color;
                      this.googleResultEnt += boldLeftClose;
                      this.googleResultEnt +=` - ${entity.type} : ${entity.name}`;
                      this.googleResultEnt += boldRight;
                      this.googleResultEnt += lineBreak;


                    });
                      $('.g_result').html(this.googleResultEnt);
                });
    },
    google_submit_syntax(){
      var sentence = String(this.viewSentence);
      var result = [];
      var lineBreak = "<br>";
      var boldLeft ='<div style="display:inline-block;border-radius:5px; padding:5px;color:white; font-weight:bold; background-color:';
      var color="";
      var boldLeftClose ='" >'
      var color ="";
      var boldRight ='</div>';
      var advcl = [];
      var advcl_words = [];
      var advmod = [];
      var advmod_words = [];
      var rcmod = [];
      var rcmod_words = [];
      var nsubj = [];
      var nsubj_words = [];
      var subject_groups = [];
      var subject_strings ="";
      var main_subjects = [];
      var text_groups = [];
      var root = "";
      var root_groups = [];
      var clause_groups = [];
      var quotationSwitch = false;
      var result_objects = "";
      var call_count = 0;
      sentence = sentence.replace(/”/g,"'");
      sentence = sentence.replace("  "," ");
      sentence = sentence.replace(/“/g,"'");
      sentence = sentence.replace("\"", "'");
      sentence = sentence.replace("\"", "'");
      this.viewSentence = String(sentence);
      this.originalSentence = String(sentence);
      this.words_highlights();
      text_groups = sentence.split(" ");
      this.textCutBySpaces = text_groups;
      this.$http.get('http://192.168.182.195:11112/proxy/google_nlp_syntax/', {params:{text_value:sentence}})
                .then(response => {
                    result = response.data;
                    result_objects = result;

                    console.log("CALL COUNT: " + call_count++);
                    this.googleResultSyn = "";
                    this.googleSummary = "";
                    for(var index =0; index<result.length; index++) {
                      var part = result[index];


                      // if(quotationSwitch){
                        // continue;
                      // }

                      if(part.dependencyEdge.label =="ADVCL"){
                        if(result[index+1].dependencyEdge.label=="PRT" || result[index+1].dependencyEdge.label=="SUFF"){
                          advcl.push(index +1);
                          advcl_words.push(result[index +1].text.content);
                          console.log("CLAUSE:" + part.text.content + result[index+1].text.content);
                        }else{
                          advcl.push(index);
                          advcl_words.push(part.text.content);
                          console.log("CLAUSE:" + part.text.content);
                        }
                      }else if(part.dependencyEdge.label =="NSUBJ" || part.dependencyEdge.label =="NSUBJPASS"){
                        nsubj.push(index);
                        subject_strings = "";
                        var pure_strings = "";
                        if(index-2>0 && result[index-2].dependencyEdge.label =="POSS"){
                          subject_strings = result[index-2].text.content;
                          if(index-1>0 && result[index-1].dependencyEdge.label =="PRT"){
                            subject_strings += result[index-1].text.content;
                          }
                        }


                        subject_strings += this.noun_mergers(result_objects, index);
                        pure_strings = part.text.content;

                        if(index-2>0 && result[index-2].dependencyEdge.label =="CONJ"){
                          subject_strings += result[index-2].text.content;
                          if(index-1>0 && result[index-1].dependencyEdge.label =="PRT"){
                            subject_strings += result[index-1].text.content;
                          }
                        }

                        subject_strings += part.text.content;
                        if(index +1 < result.length && result[index +1].dependencyEdge.label =="PRT"){
                          subject_strings += result[index +1].text.content;
                          pure_strings += result[index +1].text.content;
                        }
                        subject_groups.push(subject_strings);
                        if(!quotationSwitch){
                          main_subjects.push(subject_strings);
                        }
                        nsubj_words.push(part.text.content);
                        console.log("SUBJECT:" + subject_strings);
                      }else if(part.dependencyEdge.label =="ROOT"){
                        root = "";
                        if(index-3>0 && result[index-3].dependencyEdge.label =="DOBJ"){
                          root = this.noun_mergers(result_objects, index-3);
                          root += result[index-3].text.content;
                          if(index-2>0 && result[index-2].dependencyEdge.label =="PRT"){
                            root += result[index-2].text.content;
                          }
                        }

                        if(index-4>0 && result[index-4].dependencyEdge.label =="DOBJ"){
                          root = this.noun_mergers(result_objects, index-4);
                          root += result[index-4].text.content;
                          if(index-3>0 && result[index-3].dependencyEdge.label =="PRT"){
                            root += result[index-3].text.content;
                          }
                        }
                        if(index-1>0 && result[index-1].dependencyEdge.label =="AUX" || index-1>0 && result[index-1].dependencyEdge.label =="ATTR"){
                          root += this.noun_mergers(result_objects, index-1);
                          if(index-2>0 && result[index-2].dependencyEdge.label =="RCMOD"){
                            root += result[index-2].text.content;
                          }
                          root += result[index-1].text.content;

                        }


                        if(index-2>0 && result[index-2].dependencyEdge.label =="AUX"){
                          root += result[index-2].text.content;
                          if(index-1>0 && result[index-1].dependencyEdge.label =="SUFF" || index-1>0 && result[index-1].dependencyEdge.label =="PRT"){
                            root += result[index-1].text.content;
                          }
                        }

                        if(index-2>0 && result[index-2].dependencyEdge.label =="ADVMOD"){
                          root += this.noun_mergers(result_objects, index-2);
                          root += result[index-2].text.content;
                          if(index-1>0 && result[index-1].dependencyEdge.label =="PRT" ){
                            root += result[index-1].text.content;
                          }
                        }

                        if(index-2>0 && result[index-2].dependencyEdge.label =="DOBJ"){
                          root = this.noun_mergers(result_objects, index-2);
                          root += result[index-2].text.content;
                          if(index-1>0 && result[index-1].dependencyEdge.label =="PRT"){
                            root += result[index-1].text.content;
                          }
                        }

                        root += part.text.content;
                        if(index+1< result.length && result[index+1].dependencyEdge.label =="SUFF" || index+1< result.length && result[index+1].dependencyEdge.label =="PRT"){
                          root += result[index+1].text.content;
                        }
                        console.log("ROOT:" + root);
                        if(index-1>0 && result[index-1].dependencyEdge.label =="ADVCL" ){
                          root = part.text.content;
                        }
                        root_groups.push(root);
                      }else if(part.dependencyEdge.label =="RCMOD"){
                        rcmod.push(index);
                        var rcmod_text = part.text.content;
                        if(index+1< result.length && result[index+1].dependencyEdge.label =="SUFF"){
                          rcmod_text +=" " + part.text.content;
                        }
                        rcmod_words.push(rcmod_text);
                      }
                      if(part.text.content =="'" || part.text.content =="\"" || part.text.content =="“" || part.text.content =="”"){
                        if(quotationSwitch ==false){
                          quotationSwitch = true;
                        }else{
                          quotationSwitch = false;
                      }
                    }
                      this.googleResultSyn += lineBreak;
                      this.googleResultSyn +=`${part.partOfSpeech.tag}: ${part.text.content}`;
                      this.googleResultSyn += lineBreak;
                      this.googleResultSyn += `${part.dependencyEdge.label}`;
                      this.googleResultSyn += lineBreak;

                    };

                      console.log(this.googleResultSyn);
                      console.log("Subject Count:" + subject_groups.length);
                      console.log("Clause Count:" + advcl_words.length);
                      console.log("Relation MOD COUNT: " + rcmod_words.length);
                      for(var i=0; i<advcl_words.length; i++){
                        if(i==0){
                          if(nsubj.length>=1 && nsubj[0] < advcl[0]){
                            // console.log("Caluse: " + this.sentence_merger(sentence, subject_groups[0], advcl_words[0]), "subject present");
                            clause_groups.push(this.sentence_merger(sentence, subject_groups[0], advcl_words[0]));
                          }else{
                            // console.log("Caluse: " + this.sentence_merger(sentence, "none", advcl_words[0]),"subject absent");
                            clause_groups.push(this.sentence_merger(sentence, "none", advcl_words[0]));
                          }
                        }else{
                          // console.log("Caluse: " +"Start_WORDS:" +advcl_words[i-1] + "end_words:" + advcl_words[i] + this.sentence_merger(sentence, advcl_words[i-1], advcl_words[i]), "subject absent");
                            clause_groups.push(this.sentence_merger(sentence, advcl_words[i-1], advcl_words[i]));
                        }
                      }

                      for(var i=0; i<rcmod_words.length; i++){
                        if(nsubj.length>1 && nsubj[i] < rcmod_words[0]){
                          console.log("RCMOD: " + this.sentence_merger(sentence, subject_groups[1], rcmod_words[0]), "subject present");
                        }
                      }
                      this.googleSummary += '<div class="row">';
                      this.googleSummary += '<div style="border-radius:5px; padding:5px;color:white; font-weight:bold; background-color:#2C3539; text-align:center">주어</div>'
                      this.googleSummary += '<div class="row">';
                      this.googleSummary += this.print_elements("주어", subject_groups);
                      this.googleSummary += '</div>';

                      this.googleSummary += '<div style="margin-top:30px;border-radius:5px; padding:5px;color:white; font-weight:bold; background-color:#2C3539;text-align:center">주요 동사</div>'
                      this.googleSummary += '<div class="row">';
                      this.googleSummary += this.print_elements("메인동사", root_groups);
                      this.googleSummary += '</div>';

                      this.googleSummary += '</div>'
                      // this.googleSummary += this.print_elements("절", clause_groups);
                      console.log(this.print_elements("절", clause_groups));
                      // this.googleSummary += lineBreak;
                      $('.g_result_summary').html(this.googleSummary);
                });
    },
    print_elements(name, arrayGroups){
      var print_groups = "[";
      for(var i=0; i<arrayGroups.length; i++){
        print_groups += arrayGroups[i] + ",";
      }
      print_groups += "]";
      //console.log(print_groups);
      return print_groups;
    },
    get_whole_word(partial_word){
      var whole_word = "";
      for(var i=0; i<this.textCutBySpaces.length; i++){
        if(this.textCutBySpaces[i].includes(partial_word)){
          whole_word = this.textCutBySpaces[i];
          break;
        }
      }
      console.log("Word FOUND:" + whole_word);
      return whole_word;
    },
    sentence_merger(original_sentence, start_word, end_word){
      var sentence ="";
      var startIndex;
      console.log("sentence merger activated");
      //var correctWord = this.get_whole_word(start_word);
      //startIndex = original_sentence.indexOf(correctWord) + correctWord.length;
      startIndex = original_sentence.indexOf(start_word) + start_word.length;

      var endIndex = original_sentence.indexOf(end_word) + end_word.length;
      var sentence = original_sentence.substring(startIndex, endIndex);
      sentence = sentence.replace("'", "");
      return sentence;
    },
    noun_mergers(objects, index){
      console.log("noun merger activated");
      index --;
      var merged_noun ="";
      for(var i=index; i>=0; i--){
        if(objects[i].dependencyEdge.label =="NN"){
          merged_noun = objects[i].text.content + " " + merged_noun;
        }else{
          break;
        }
      }
      return merged_noun;
    },
    submit(){
      console.log("submit_function_called");
      this.submitCounter += 1; //우리 submitCounter로 바꿔요 ㅋㅋㅋㅋ prev next 때문에 애매하니깐 --> 넵 ㅋㅋㅋ
      this.save_tag();
      if (this.quotesPresent === true) {
        // 인용구로 update 하기
        var new_sentence = String(this.quotesValue);
        var new_id = String(this.quotesId);
        this.initialize_selection();
        this.originalSentence = String(new_sentence);
        this.find_quotes();
        this.viewSentence = String(new_sentence);
        this.sentenceId = new_id;
        console.log("if submit");
        this.words_highlights();

      } else {
        this.initialize_selection(); // 기존에 입력되었던 것 초기화 필요
        this.load_sentence();
        console.log("else submit");
      };
    },
    find_quotes(){
      var text = this.originalSentence;
      var patternOne = /".*?"/g;
      var patternTwo = /“.*?”/g;
      var patternThree = /'.*?'/g;
      var stringsInQuotes = '';

      if((stringsInQuotes = patternTwo.exec(text)) || (stringsInQuotes =patternOne.exec(text)) || (stringsInQuotes =patternThree.exec(text))){
          var stringsInQuotes = String(stringsInQuotes);
          this.quotesPresent = true;
          this.quotesValue = stringsInQuotes.substring(1, stringsInQuotes.length-1)
          this.quotesId = this.sentenceId + "_5";
      }

    },
    words_highlights() {
      var text = this.originalSentence;

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
      this.$http.get('http://192.168.182.195:11112/proxy/tag_read/')
                .then(response => {
                var raw_string = response.data;
                console.log(raw_string); // ex: {"sentence_text":"창조관은 대학의 중심에 위치해 방송문화예술대학 실습실 및 강의실로 이용할 예정이다.","sentence_id":"5-13"}
                var sentence ="";
                this.sentenceId = raw_string.sentence_id;
                this.previousSentence = String(this.originalSentence);
                sentence = String(raw_string.sentence_text);
                sentence = sentence.replace(/”/g,"'");
                sentence = sentence.replace("  "," ");
                sentence = sentence.replace(/“/g,"'");
                sentence = sentence.replace("\"", "'");
                sentence = sentence.replace("\"", "'");
                this.viewSentence = String(sentence);
                this.originalSentence = String(sentence);
                this.words_highlights();
                this.find_quotes();
                this.google_submit_entity();
                this.google_submit_syntax();
      });

    },
    load_values_by_id(){ // prev function에서 발생된다면 sentenceId 가 먼저 prevSentenceId값으로 변환이 되어야함.
      this.$http.get('http://192.168.182.195:11112/proxy/tag_read_by_id/', {params:{sentence_id:this.sentenceId}})
                .then(response => {
                var raw_string = response.data;
                console.log(raw_string); // ex: {"sentence_text":"창조관은 대학의 중심에 위치해 방송문화예술대학 실습실 및 강의실로 이용할 예정이다.","sentence_id":"5-13"}
                //this.sentenceId = raw_string.sentence_id;


      });

    },
    save_tag(){
      var save_data = JSON.stringify(this.get_save_data());
      this.$http.get('http://192.168.182.195:11112/proxy/tag_save/', {params:{save_data:save_data}})
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
      console.log("save data" + this.quotesId);
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
      //console.log('q1'+this.quotesId);
      this.searchTerm='';
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
.control-box{
  color:black;
}

.prev_or_next{
  font-weight:bold;
  font-size:25px;
  margin-right:20px;
  font-family: 'Nanum Gothic', sans-serif;


}

.display_section{
  font-size:15px;
  margin-right:20px;
  margin-bottom:5px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
}

.prev_or_next:hover{
  font-weight:bold;
  font-size:25px;
  margin-right:20px;
  color:#3196F3;

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
  padding:15px 5px 5px 8px;
  color:rgb(32,32,32);
  border-color: white;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
  font-weight: bold;
  width:150px;
  height: 60px;
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
  height:60px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  line-height: 100%;
}


.outer-container{
  width: 60%;
  margin: auto;
}

.google{
  background-color: blue;
}

.g_result_syn{
    font-family: 'Nanum Gothic', sans-serif;
    color:yellow;
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
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  padding:12px;
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
  padding:10px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
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
}






</style>
