import React, {useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const TextEditor = ({update}) => {
    const [desc, setDesc] = useState(EditorState.createEmpty());
    const descToHTML = desc=>draftToHtml(convertToRaw(desc.getCurrentContent()));
    const handleDescChange = data => {
        setDesc(data);
        update(descToHTML(data));
    }

    return <Editor
        editorState={desc}
        onEditorStateChange={handleDescChange}
        wrapperClassName='p-0 border border-secondary rounded'
        toolbarClassName='mb-0 p-2 bg-secondary border-0'
        editorClassName='px-2 py-0 mt-0 editor'
    />
}
export default TextEditor;