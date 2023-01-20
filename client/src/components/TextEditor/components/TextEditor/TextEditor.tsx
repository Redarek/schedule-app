import React, {FC, useContext, useEffect, useRef} from 'react';
import {IObject} from "../../../FileBrowser/models/FileBrowser";

import cl from './TextEditor.module.css'
//@ts-ignore
import {Editor, EditorState} from 'draft-js'
import {useEditor} from "../../useEditor";
import {useEditorApi} from "../../context";
import {BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP} from '../../config';


interface DocViewerComponentProps {
    // doc: IObject
}

const TextEditor: FC<DocViewerComponentProps> = ({}) => {


    const height = window.innerHeight


    const editorRef = useRef(null);

    const editorApi = useEditorApi()

    const log = () => {
        if (editorRef.current) {
            //@ts-ignore
            console.log(editorRef.current.getContent());
        }

    };

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );


    const {state, onChange} = useEditorApi();

    return (
        <div className={cl.wrapper}>
            <Editor
                handleKeyCommand={editorApi.handleKeyCommand}
                placeholder="Введите ваш текст"
                editorState={state}
                onChange={onChange}
                blockRenderMap={BLOCK_RENDER_MAP}
                customStyleMap={CUSTOM_STYLE_MAP}
            />
        </div>
    );
};

export default TextEditor
