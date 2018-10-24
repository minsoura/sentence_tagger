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

  <div class="outer-container" style="display:block;">
    <div id="tagger">
      <h1 style="color:#1c2e5a">유의어 판별</h1>
      <p>가짜뉴스 검출을 위해</p>
      <hr>
    </div>

    <div class="upper_container" style="display:block;">
      <div id="input">
          <textarea autofocus id="mainTextArea" v-model="compWord1" ref="mainText" placeholder="첫번째 단어를 입력 하세요."></textarea>
      </div>

      <div id="input2">
          <textarea autofocus id="mainTextArea2" v-model="compWord2" ref="mainText2" placeholder="두번째 단어를 입력 하세요." ></textarea>
      </div>

      <div class="control-box" style="marginTop:120px; display:inline-block;">
        <label class="prev_or_next" v-on:click="sendWordsToProxy">비교하기</label>
      </div>
    </div>

    <div class="upper_container" style="display:block;">
        <label style="float:left">클릭 후 콘솔로 결과 확인</label>
      <!-- <div id="input">
          <textarea autofocus id="engTextArea" v-model="transWordView1" ref="engText" placeholder="영어 단어 1"></textarea>
      </div> -->

      <!-- <div id="input2">
          <textarea autofocus id="engTextArea2" v-model="transWordView2" ref="engText2" placeholder="영어 단어 2" ></textarea>
      </div> -->

    </div>

    <div class="display_box" style="marginTop:100px; marginLeft:23px; display:block;  border:solid; borderRadius:5px; overflow: auto; word-wrap: break-word">
      <!-- <div class="display_section">{{"첫번째 영단어 유의어: " + firstSynList}}</div>
      <div class="display_section">{{"두번째 영단어 유의어: " + secondSynList}}</div>
      <div class="display_section">{{"겹쳐지는 단어: " + overlappedWords}}</div> -->
      <div class="display_section">{{"결과: " + finalResult}}</div>
    </div>





    </div>
  </div>
  </div>
</template>
<script>
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'highlight-within-textarea'
var synonyms = require("synonyms");
var lemma = require("wink-lemmatizer");
var stemm = require('stemmer');

export default{
  beforeMount(){
    console.log("beforeMounted activated");

  },
  mounted(){
    console.log("mounted activated");
    var test = "to go up";
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
      name:'Fake News- Sym Detection',
      compWord1:"",
      compWord2:"",
      transWord1:"",
      transWord2:"",

      transWordView1:"",
      transWordView2:"",

      transWordGroups1: [],
      transWordGroups2: [],
      firstSynList:"",
      secondSynList:"",
      firstSynArray:[],
      secondSynArray:[],

      overlappedWords:"",
      overlappedWordsArray:[],
      finalResult:"",
    }
  },
  watch:{

  },
 	methods:{
    checkPreposition(wordElement){
      wordElement = wordElement.toLowerCase();
      var returnVal = "false";
      var substringCount = wordElement.split(" ");
      var preposition = ['of', 'with', 'at', 'from', 'into', 'towards',
      'upon', 'to', 'in', 'on', 'for', 'about', 'up', 'around', 'down',
      'off', 'above', 'near','during', 'until', 'against', 'throughout',
      'by', 'over', 'before', 'between','after', 'since', 'without', 'under',
      'within', 'along', 'across', 'behind', 'beyond'];
      if(preposition.includes(wordElement)){
        return "false"; // #if the word is exacly the same in the array, allow to be used.
      }else{
          var count = 0;
          //to 부정사의 처리를 어떻게 할 것인가 ex: to fall vs to fall down
          //in case of 'to fall': substringCount = 2; starts with the preposition
          if(wordElement.includes("to") && substringCount.length==2 && wordElement.indexOf("to")==0){ //to 부정사의 경우 통과 시키기 위해
            console.log("to 부정사 발견: " + wordElement);
            return "true";
          }
          preposition.forEach(function(posi){
            if(wordElement.includes(posi) && substringCount.length>1){ // inn, coffee 같은 전치사는 아니지만 전치사와 스펠링이 같은 한단어들은 통과시키기 위해
              count ++;
            }
          });

          if(count>0){
            return "false";
          }else{
            return "true";
          }
      }
    },
    makeList(arrays){
      var wordsFragments = [];
      for(var i=0; i<arrays.length; i++){
        var filteredString = arrays[i].replace(/ \([\s\S]*?\)/g, '');
        filteredString = filteredString.trim();
        var returnValue = this.checkPreposition(filteredString);
        if(returnValue =="true"){
          var chunks = filteredString.split(" ");
          chunks.forEach(function(oneWord){
            if((oneWord !="To" && oneWord !="to" && oneWord !="a" & oneWord !="an")&&(oneWord.length >1)){
              wordsFragments.push(oneWord.toLowerCase());
            }
          })
        }
      }
      return wordsFragments;
    },
    clearUI(){
      this.transWord1 = '';
      this.transWord2 = '';
      this.transWordGroups1 = [''];
      this.transWordGroups2 = [''];
      this.firstSynList = "";
      this.secondSynList = "";
      this.overlappedWords = "";


      this.firstSynArray=[];
      this.secondSynArray=[];

      this.overlappedWords ="";
      this.overlappedWordsArray=[];
    },
    sendWordsToProxy(){
      this.clearUI();
      var kor_word1 = String(this.compWord1);
      var kor_word2 = String(this.compWord2);
      //TODO: stemming 어근화 시켜서 쿼리
      //TODO: 사랑, 사랑하다
      //TODO: 한국어 사전 의미 비교
      //TODO: 반의어 비교
      var result_string1 = "";
      var result_string2 = "";
      var checker1 = false;
      var checker2 = false;
      var resultGroups1 = [] ;
      var resultGroups2 = [] ;
      console.log("==============Process 1(한영 번역 시작)==============");
      this.$http.get('http://localhost:11112/proxy/eng_words/', {params:{words:kor_word1}})
                .then(response => {
                    var result1 = response.data;
                    if(result1!="no data"){
                      if(result1.length==1){
                        result_string1 = result1[0]["eng"];
                        result_string1 = result_string1.replace(/ \([\s\S]*?\)/g, '');
                        resultGroups1.push(result_string1);
                        result_string1 = result_string1.replace("\"", "");
                        this.transWordGroups1 = result_string1.split(",");
                        this.transWordView1 = this.transWordGroups1.toString();
                        checker1 = true;
                      }else{
                        checker1 = true;
                        for(var i=0; i<result1.length; i++){
                          resultGroups1.push(result1[i]["eng"]);
                          console.log("왼쪽 단어의 뜻 [" + (i+1)+ "]" + result1[i]["eng"]);
                        }
                      }
                    }else{
                      this.transWordView1 = "none found";
                    }
                    this.$http.get('http://localhost:11112/proxy/eng_words/', {params:{words:kor_word2}})
                              .then(response =>{
                                  var result2 = response.data;
                                  if(result2!="no data"){
                                    if(result2.length ==1){
                                      result_string2 = result2[0]["eng"];
                                      result_string2 = result_string2.replace(/ \([\s\S]*?\)/g, '');
                                      resultGroups2.push(result_string2);
                                      result_string2 = result_string2.replace("\"", "");
                                      this.transWordGroups2 = result_string2.split(",");
                                      checker2 = true;
                                      this.transWordView2 = this.transWordGroups2.toString();
                                    }else{
                                      checker2 = true;
                                      for(var i=0; i<result2.length; i++){
                                        resultGroups2.push(result2[i]["eng"]);
                                          console.log("오른쪽 단어의 뜻 [" +(i+1)+ "]" + result2[i]["eng"]);
                                      }
                                    }
                                  }else{
                                    this.transWordView2 = "none found";
                                  }
                                  if(checker1 && checker2){
                                    var synonymCount = 0;
                                    console.log("==============Process 2(단어 비교 시작)==============");
                                    for(var i=0; i<resultGroups1.length; i++){
                                      resultGroups1[i]= resultGroups1[i].replace("\"", "");
                                      resultGroups1[i]= resultGroups1[i].trim();
                                      var listGroups1 = resultGroups1[i].replace(/ \([\s\S]*?\)/g, '');
                                      listGroups1 = listGroups1.split(",");
                                      for(var j=0; j<resultGroups2.length; j++){
                                        resultGroups2[j]= resultGroups2[j].replace("\"", "");
                                        resultGroups2[j]= resultGroups2[j].trim();
                                        var listGroups2 = resultGroups2[j].replace(/ \([\s\S]*?\)/g, '');
                                        listGroups2 = listGroups2.split(",");
                                        console.log("왼쪽 단어 뜻[" + (i+1) +"] vs 오른쪽 단어 뜻[" + (j+1) +"]");
                                        //

                                        var wordsFiltered1 = this.makeList(listGroups1);
                                        var wordsFiltered2 = this.makeList(listGroups2);
                                        console.log("필터링 전 listGroups1: " + listGroups1.toString());
                                        console.log("필터링 전 listGroups2: " + listGroups2.toString());
                                        console.log("필터링 후 FIRSTLIST: " + wordsFiltered1.toString());
                                        console.log("필터링 후 SECONDLIST: " + wordsFiltered2.toString());
                                        if(wordsFiltered1.length >0 && wordsFiltered2.length > 0){
                                          console.log("(의미 비교)");
                                          var overlappedFound = this.compWordsArray(wordsFiltered1, wordsFiltered2); //순수 단어만 이용해서 비교
                                          console.log("의미 비교 결과: " + overlappedFound);
                                          if(overlappedFound === false){ //단어의미만 비교했을때 값이 없을 경우 동의어 이용해서 비교
                                            console.log("(유의어 비교)");
                                            var overlappedSynFound = this.compWordsWithSynonyms(wordsFiltered1, wordsFiltered2);
                                            console.log("유의어 판별 결과: " + overlappedSynFound);
                                            if(overlappedSynFound){
                                              synonymCount ++;
                                            }else{
                                            }
                                          }else{
                                            console.log("동의어임");
                                          }
                                        }else{
                                          console.log("비교 불가");
                                        }
                                          console.log("==========================================");
                                      }
                                    }
                                    if(synonymCount>0){
                                      var Owords = this.overlappedWordsArray.toString();
                                      this.finalResult ="[최종 판별]유의어는 발견 된듯함--->" + Owords;
                                      console.log("[최종 판별]유의어는 발견 된듯함--->" +Owords);
                                    }else{
                                      this.finalResult ="[최종 판별]유의어도 발견되지 않음";
                                      console.log("[최종 판별]유의어도 발견되지 않음");
                                    }
                                    //TODO: dictionary --> multiple words present
                                    //TODO: when the explanation is not limited to one word but many words
                                    //TODO: TO 처리, /처리,
                                    //TODO: 단어가 여러개로 이루어져있지만, 단어1 vs 단어2 에서 전치사를 제외한 동일한 단어를 자기고 있는 경우는 잡아주느게 필요함

                                  }else{
                                    this.finalResult ="[최종 판별]비교 불가";
                                    console.log("[최종 판별]비교 불가");
                                  }
                                });
                  });
    },
    compWordsWithSynonyms(wordList1, wordList2){
      var synonymCount = 0;

      for(var j=0; j<wordList1.length; j++){
        var firstElement = wordList1[j];
        for(var k=0; k<wordList2.length; k++){
          var secondElement = wordList2[k];
          if(this.compSynonyms(firstElement, secondElement) == true){
            synonymCount ++;
          }
        }
      }
      if(synonymCount >0){
        return true;
      }else{
        return false;
      }
    },
    compSynonyms(word1, word2){
      var json1 = synonyms(String(word1));
      var json2 = synonyms(String(word2));

      //TODO: synonyms가 undefined를 return 하는 경우/ 즉 유의어가 존재하지 않을 경우
      if(typeof json1 == "undefined" || typeof json2 == "undefined"){
        return false;
      }

      var keys1 = Object.keys(json1);
      var keys2 = Object.keys(json2);
      var firstListArr = [];
      var secondListArr = [];

      keys1.forEach(function(key){
        var tempArray1 = json1[key];
        firstListArr = firstListArr.concat(tempArray1);
      });

      keys2.forEach(function(key){
        var tempArray2 = json2[key];
        secondListArr = secondListArr.concat(tempArray2);
      });

      var firstSetCount = firstListArr.length;
      var secondSetCount = secondListArr.length;

      var firstListTotal = firstListArr;
      var secondListTotal = secondListArr;

      for(var i=0; i<firstSetCount; i++){
        var tempObject1 = synonyms(String(firstListArr[i]));
        var tempArrays1 = [];
        var keys = Object.keys(tempObject1);
        keys.forEach(function(key){
          var tempArray = tempObject1[key];
          tempArrays1 = tempArrays1.concat(tempArray);
        });


        for(var j=0; j<tempArrays1.length; j++){
          if(firstListTotal.includes(tempArrays1[j]) === false && tempArrays1[j].length >1){
            firstListTotal.push(tempArrays1[j]);
          }
        }
      }

      for(var i=0; i<secondSetCount; i++){
        var tempObject2 = synonyms(String(secondListArr[i]));
        var tempArrays2 = [];

        var keys = Object.keys(tempObject2);
        keys.forEach(function(key){
          var tempArray = tempObject2[key];
          tempArrays2 = tempArrays2.concat(tempArray);
        });

        for(var j=0; j<tempArrays2.length; j++){
          if(secondListTotal.includes(tempArrays2[j]) === false && tempArrays2[j].length >1){
            secondListTotal.push(tempArrays2[j]);
          }
        }
      }
      var overlappedCount = 0;
      var overlappedArrays = [];

      var firstVerbConvertedArrays = [];
      var secondVerbConvertedArrays = [];

      firstListTotal.forEach(function(value){
        firstVerbConvertedArrays.push(lemma.verb(value))
      });

      secondListTotal.forEach(function(value){
        secondVerbConvertedArrays.push(lemma.verb(value))
      });

      // console.log("[ "+ word1 + " ]의 유의어: " + firstVerbConvertedArrays.toString());
      // console.log("[ "+ word2 + " ]의 유의어: " + secondVerbConvertedArrays.toString());

      for(var i=0; i<secondVerbConvertedArrays.length; i++){
        if(firstVerbConvertedArrays.includes(secondVerbConvertedArrays[i])){
          overlappedArrays.push(secondVerbConvertedArrays[i]); //local
          if(!this.overlappedWordsArray.includes(secondVerbConvertedArrays[i]) && secondVerbConvertedArrays[i].length>1){
            this.overlappedWordsArray.push(secondVerbConvertedArrays[i]); //global;
          }
        }
      }

      if(overlappedArrays.length >=1){
        return true;
      }else{
        return false;
      }


    },
    compWordsArray(firstGroups, secondGroups){ // 동의어 사용하기 전에 순수하게 단어 의미로 비교
      var count = 0;
      for(var j=0; j<firstGroups.length; j++){
        var firstElement = firstGroups[j];
        if(secondGroups.includes(firstElement)){
          console.log("FOUND: " + firstElement);
          count ++;
        }
      }

      if(count > 0){
        return true;
      }else{
        return false;
      }
    },
    transWords(){

        var json1 = synonyms(String(this.transWord1));
        var json2 = synonyms(String(this.transWord2));

        //TODO: synonyms가 undefined를 return 하는 경우/ 즉 유의어가 존재하지 않을 경우

        console.log("JSON: " + JSON.stringify(json1));
        console.log("JSON: " + JSON.stringify(json2));
        var keys1 = Object.keys(json1);
        var keys2 = Object.keys(json2);
        var firstListArr = [];
        var secondListArr = [];

        keys1.forEach(function(key){
          var tempArray1 = json1[key];
          firstListArr = firstListArr.concat(tempArray1);
        });

        keys2.forEach(function(key){
          var tempArray2 = json2[key];
          secondListArr = secondListArr.concat(tempArray2);
        });

        var firstSetCount = firstListArr.length;
        var secondSetCount = secondListArr.length;

        var firstListTotal = firstListArr;
        var secondListTotal = secondListArr;

        for(var i=0; i<firstSetCount; i++){
          var tempObject1 = synonyms(String(firstListArr[i]));
          var tempArrays1 = [];
          var keys = Object.keys(tempObject1);
          keys.forEach(function(key){
            var tempArray = tempObject1[key];
            tempArrays1 = tempArrays1.concat(tempArray);
          });


          for(var j=0; j<tempArrays1.length; j++){
            if(firstListTotal.includes(tempArrays1[j]) === false && tempArrays1[j].length >1){
              firstListTotal.push(tempArrays1[j]);
            }
          }
        }

        for(var i=0; i<secondSetCount; i++){
          var tempObject2 = synonyms(String(secondListArr[i]));
          var tempArrays2 = [];

          var keys = Object.keys(tempObject2);
          keys.forEach(function(key){
            var tempArray = tempObject2[key];
            tempArrays2 = tempArrays2.concat(tempArray);
          });

          for(var j=0; j<tempArrays2.length; j++){
            if(secondListTotal.includes(tempArrays2[j]) === false && tempArrays2[j].length >1){
              secondListTotal.push(tempArrays2[j]);
            }
          }
        }

        var overlappedCount = 0;
        var overlappedArrays = [];

        var firstVerbConvertedArrays = [];
        var secondVerbConvertedArrays = [];

        firstListTotal.forEach(function(value){
          firstVerbConvertedArrays.push(lemma.verb(value))
          console.log("LEMMA VERB: " + lemma.verb(value));
        });

        secondListTotal.forEach(function(value){
          secondVerbConvertedArrays.push(lemma.verb(value))
          console.log("LEMMA VERB: " + lemma.verb(value));
        });

        for(var i=0; i<secondVerbConvertedArrays.length; i++){
          if(firstVerbConvertedArrays.includes(secondVerbConvertedArrays[i])){
            overlappedArrays.push(secondVerbConvertedArrays[i]);
            console.log("FOUND: " + secondVerbConvertedArrays[i]);
          }
        }

        if(overlappedArrays.length >=1){
          this.finalResult = "유의어 입니다."
        }else{
          this.finalResult = "유의어가 아닌듯 합니다."
        }

        this.firstSynList = firstVerbConvertedArrays.toString();
        this.secondSynList = secondVerbConvertedArrays.toString();
        this.overlappedWords = overlappedArrays.toString();
        console.log("trans1" +this.firstSynList);
        console.log("trans2" +this.secondSynList);
    },

  }
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
  padding:10px;
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
  display: block;
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
#input textarea, #input2 textarea {
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  padding:12px;
  font-size: 1.2rem;
  line-height: 200%;

  border-style: solid;
  border-color: grey;
  border-width: medium;
  border-radius: 5px;
  width: 30%;

  margin:50px;

  float:left;
  background-color: transparent;
  overflow: auto;
  min-height:50px;
}

#input label{
  margin-top:10px;
}

#tagger p {
  display:inline;
  color:#797979;
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
  margin: 0 auto;
  transform: translateZ(0);
  -webkit-text-size-adjust: none;
}





mark {
  border-radius: 3px;
  color: transparent;
}






</style>
