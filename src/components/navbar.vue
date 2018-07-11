<template>
  <div>
  <div class="topnav" style="backgroundColor:#2196F3;">
    <div class="logo_zum">
      <a href="http://zum.com">
        <img src="/../../static/images/zum-logo.png" >
      </a>
    </div>


  </div>


</div>
</template>
<script>

</script>
<script>
export default {

  data () {
    return {
      extend_works_item: false,
      name:'navbar',
      currentButton:"default",
      resultShow : false,
      resultSentence:"",
      compNamesArr:[],
      routerLinksArr:[],
    }
  },
  methods: {
    changeButtonColor: function(comp_name){
        console.log("BUTTON_NAME:" + comp_name);
        var button = document.getElementById(comp_name);
        button.style.backgroundColor="#5cb85c";
    },
    select: function(event) {
        var targetId = event.currentTarget.id;
        targetId = "# " + targetId;
        console.log("select_event:" + targetId);
        var button_name= document.getElementsByClassName("btn-text");
        for(var i=0; i<button_name.length; i++){
          console.log("buttonName:" + button_name[i].innerText);
          if(targetId == button_name[i].innerText){
            button_name[i].parentNode.parentNode.style.backgroundColor="#5cb85c";
          }else{
            button_name[i].parentNode.parentNode.style.backgroundColor="#2196F3";
          }
        }
    },
    erase: function(comp_name, index) {
        var compName = event.currentTarget.id;
        console.log("deliverd:" + compName);
        this.$delete(this.compNamesArr, index);
        this.$delete(this.routerLinksArr, index);
      /*  this.$http.get('http://192.168.182.195:11111/proxy/navd/' + compName)
                  .then(response => {
                  var query_result = response.data;
                  console.log("remove_res:" + query_result);
                  this.$delete(this.compNamesArr, index);
                  this.$delete(this.routerLinksArr, index);
        });*/
    },
    search(){
      console.log("queried");
      if(this.$refs.company_query.value.trim()){
        var link_query = this.$refs.company_query.value
        var changeColor = false;
        if(link_query.indexOf('#')!=-1){
          link_query = link_query.slice(1);
          var comp_arrays = this.compNamesArr;
          link_query = link_query.replace(/ /g, '');
          var included = comp_arrays.includes(link_query)
          console.log(comp_arrays.includes(link_query));
          console.log("after slicing:" + link_query);
          if(!included){
              var query_result = "inserted";
              if (query_result=="inserted" && link_query=="엘지전자"){
                this.compNamesArr.push(link_query);
                this.routerLinksArr.push("company_lg");
                this.currentButton= link_query;
                changeColor =true;

              }else if (query_result=="inserted" && link_query=="줌인터넷"){
                this.compNamesArr.push(link_query);
                this.routerLinksArr.push("company_zum");
                this.currentButton= link_query;
                changeColor =true;
              }else if (query_result=="inserted" && link_query=="삼성전자"){
                this.compNamesArr.push(link_query);
                this.routerLinksArr.push("company_samsung");
                this.currentButton= link_query;
                changeColor =true;
              }else if (query_result=="inserted" && link_query=="아모레퍼시픽"){
                this.compNamesArr.push(link_query);
                this.routerLinksArr.push("company_amore");
                this.currentButton= link_query;
                changeColor =true;
              }else if (query_result=="inserted" && link_query=="이스트소프트"){
                this.compNamesArr.push(link_query);
                this.routerLinksArr.push("company_est");
                this.currentButton= link_query;
                changeColor =true;
              }
          /*  this.$http.get('http://192.168.182.195:11111/proxy/nav/' + link_query)
                      .then(response => {
                      var query_result = response.data;
                      console.log(query_result + "^^");
                      if (query_result=="inserted" && link_query=="엘지전자"){
                        this.compNamesArr.push(link_query);
                        this.routerLinksArr.push("company_lg");
                        this.currentButton= link_query;
                        changeColor =true;

                      }else if (query_result=="inserted" && link_query=="줌인터넷"){
                        this.compNamesArr.push(link_query);
                        this.routerLinksArr.push("company_zum");
                        this.currentButton= link_query;
                        changeColor =true;
                      }else if (query_result=="inserted" && link_query=="삼성전자"){
                        this.compNamesArr.push(link_query);
                        this.routerLinksArr.push("company_samsung");
                        this.currentButton= link_query;
                        changeColor =true;
                      }else if (query_result=="inserted" && link_query=="아모레퍼시픽"){
                        this.compNamesArr.push(link_query);
                        this.routerLinksArr.push("company_amore");
                        this.currentButton= link_query;
                        changeColor =true;
                      }else if (query_result=="inserted" && link_query=="이스트소프트"){
                        this.compNamesArr.push(link_query);
                        this.routerLinksArr.push("company_est");
                        this.currentButton= link_query;
                        changeColor =true;
                      }
                    });*/
          }
        }
        if(link_query=="삼성 전자" || link_query=="삼성전자" || link_query=="삼성"){
          this.$router.push('company_samsung')
        }else if(link_query=="줌인터넷" || link_query=="줌 인터넷" || link_query=="줌"){
          this.$router.push('company_zum')
        }else if(link_query=="아모레 퍼시픽" || link_query=="아모레퍼시픽" || link_query=="아모레"){
          this.$router.push('company_amore')
        }else if(link_query=="이스트" || link_query=="이스트소프트"  || link_query=="이스트 소프트"){
          this.$router.push('company_est')
        }else if(link_query=="카카오"){
          this.$router.push('company_kakao')
        }else if(link_query=="엘지전자" || link_query=="엘지 전자" || link_query=="엘지"){
            this.$router.push('company_lg')
        }

        this.$refs.company_query.value = "";
        console.log("link_query_normal:" + link_query);

      }else{

      }
    },
    pageClick:function(){
      var initial_path = this.$route.path;
      console.log("initial" +initial_path);
      var path ="";
      initial_path=initial_path.slice(1);
      if(initial_path=="company_samsung"){
        path="삼성전자";
      }else if(initial_path=="company_amore"){
        path="아모레퍼시픽";
      }else if(initial_path=="company_est"){
        path="이스트소프트";
      }else if(initial_path=="company_lg"){
        path="엘지전자";
      }else if(initial_path=="company_zum"){
        path="줌인터넷";
      }
      console.log(path);
      document.getElementById(path).style.backgroundColor="#5cb85c";
    }
  },


}
</script>

<style scoped>
@import url(bootstrap/dist/css/bootstrap.css);
@import url(bootstrap-vue/dist/bootstrap-vue.css);
@import url(http://fonts.googleapis.com/earlyaccess/jejumyeongjo.css);
@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic|Open+Sans');

.btn-erase{
  padding:5px;
  color:white;
  font-weight:bold;
}
.examples{
background-color:WhiteSmoke;
padding-top:35px;


}
.logo_zum {
  margin-top: -3px;
  float:left;
}

.logo_zum img {
  width: 100px;
  margin-top: 5px;
}
.text{
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
}
.topnav {
    overflow: hidden;
    background-color:#2196F3;
}

.topnav a {
    float: left;
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: bold;
}



.topnav a.active {
    background-color: #2196F3;
    color: white;
}

.topnav input[type=text] {
    padding: 6px;
    border: none;
    margin-left: -100px;
    margin-right: 16px;
    font-size: 17px;
    width: 60%;
    border-radius: 5px;
}


.btn{
  background-color: #2196F3;
  border-radius: 20px;
  margin: 10px 20px 10px 20px;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

}
.btn:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}



.btn-text{
  padding:5px;
  color:white;
  font-weight:bold;
}


/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
    .topnav a, .topnav input[type=text] {
        float: none;
        display: block;
        text-align: left;
        width: 100%;
        margin: 0;
        padding: 14px;
    }
    .topnav input[type=text] {
        border: 1px solid #ccc;
    }
}
</style>
