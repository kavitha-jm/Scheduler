import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import SaveContent_Service from "../services/save-content";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    
  }
 

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  savaeSchedule() {
    const contentState = this.state.getCurrentContent();

    const rawContent = JSON.stringify(convertToRaw(contentState));
    SaveContent_Service.saveData(rawContent)
    .then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          
        />
       
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
        
             
        </div>
    );
  }
}
