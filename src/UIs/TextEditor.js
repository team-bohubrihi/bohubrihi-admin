import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const EditorComponent = () => {
  const [txt, setTxt] = useState(EditorState.createEmpty());

    return <>
    <button onClick={()=>console.log(draftToHtml(convertToRaw(txt.getCurrentContent())))}>Click</button>
    
    <Editor
    editorState={txt}
    onEditorStateChange={setTxt}
      editorStyle={{
        height: '40vh'
      }}
    />
    </>
}
export default EditorComponent;