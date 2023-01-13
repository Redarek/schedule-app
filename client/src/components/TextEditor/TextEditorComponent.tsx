import React from 'react';
import {TextEditorProvider} from "./context";
import Toolbar from "./components/Toolbar/Toolbar";
import TextEditor from "./components/TextEditor/TextEditor";

const TextEditorComponent = () => {
    return (
        //@ts-ignore
        <TextEditorProvider>
            <Toolbar/>
            <TextEditor/>
        </TextEditorProvider>
    );
};

export default TextEditorComponent;
