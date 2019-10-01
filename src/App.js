import React, {Component} from 'react';
import './App.css';
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Subject from"./components/Subject"
import Control from"./components/Control"

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub: 'World wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      content:{title:'HTML', desc:'HTML is HyperText Markup Language.'},
      contents: [
        {id:1, title:'HTML', desc: 'HTML is for information'},
        {id:2, title:'CSS', desc: 'CSS is for design'},
        {id:3, title:'JavaScript', desc: 'JavaScript is for interactive'},
      ]
    }
  }
  render(){ 
    console.log('App render');
    var _title, _desc, _article =  null;
      if(this.state.mode === 'welcome'){
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
      }else if(this.state.mode === 'read'){
        var i = 0;
        while(i<this.state.contents.length){
          var data = this.state.contents[i];
          if(data.id === this.state.selected_content_id){
            _title = data.title;
            _desc = data.desc;
            break;
          }
          i=i+1;
        }
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
      }else if(this.state.mode === 'create'){
        _article = <CreateContent onSubmit={function(_title, _desc){
          this.max_content_id++;
          //푸쉬 사용시 성능 개선할 때 까다롭기 때문에 원본을 변경하지 않는 concat 사용
          // this.state.contents.push(
          //   {id:this.max_content_id, title:_title, desc:_desc}
          // );
            var _contents = this.state.contents.concat(
              {id:this.max_content_id, title:_title, desc:_desc}
            );
          this.setState({
            //contents:this.state.contents
            contents:_contents
          });
        }.bind(this)}></CreateContent>;
      }

    return(
     <div className="App">
      <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          if(this.state.mode==='read'){
            this.setState({mode:'welcome'});
          }else{
            this.setState({mode:'read'});
          }
        }.bind(this)}
        >    
      </Subject>
      <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}
        data={this.state.contents}></TOC>
      <Control onChangeMode={function(_mode){
        this.setState({
          mode:_mode
        });
      }.bind(this)}></Control>  
      {_article}
    </div>
   );
  }
}



export default App;
