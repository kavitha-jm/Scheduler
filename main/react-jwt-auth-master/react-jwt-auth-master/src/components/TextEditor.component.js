import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import SaveContent_Service from "../services/save-content";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.saveSchedule=this.saveSchedule.bind(this);
    //this.onEditorStateChange=this.onEditorStateChange.bind(this);

    this.state = {
      id : null,
      content : "",
      editorState: EditorState.createEmpty()
  };
  }
  onEditorStateChange = editorState =>(
    this.setState ({
      editorState
    } )

    );
  
  

  onChangeContent(e){
    console.log(" c1",this.state.content)
    const data=e.target.value;
    console.log(" c2",data)
    this.setState({
      content : JSON.stringify(convertToRaw(data))
    });
    console.log("content",this.state.content)
  }

  saveSchedule(e) {
    var data = {
      content: this.state.content
     
    };
    SaveContent_Service.saveData(e.target.value)
    .then(
      response => {
        this.setState({
          id: response.data.id,
          content: response.data.content
        });
        console.log(response.data);
      }
    )
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const { editorState } = this.state;
    //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div >
      <div >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
          onEditorStateChange={this.onEditorStateChange}
         
        />
        <button 
        className="savebutton  m-3 btn btn-sm" 
        value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
        onClick={this.saveSchedule}><b>SAVE</b></button>  
        <textarea 
          disabled
          value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
          onChange = {this.onChangeContent}
        ></textarea>
        
             
        </div>
        </div>
    );
  }
}
