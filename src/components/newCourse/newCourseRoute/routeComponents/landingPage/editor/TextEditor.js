import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const TextEditor = ({value, update}) => <Editor
    editorState={value==='' ? EditorState.createEmpty() : value}
    onEditorStateChange={data=>update({
        raw: data,
        converted: draftToHtml(convertToRaw(data.getCurrentContent()))
    })}
    wrapperClassName='p-0 border border-secondary rounded'
    toolbarClassName='mb-0 p-2 bg-secondary border-0'
    editorClassName='px-2 py-0 mt-0 editor'
/>;
export default TextEditor;