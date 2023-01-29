import React, {useState} from 'react';
import cl from '../styles/DocumentPage.module.css'
import {useParams} from "react-router-dom";
import Editor from "../components/Editor/Editor";

const DocumentPage = () => {
    const documentId = useParams()

    const [activeMode, setActiveMode] = useState<'view-mode' | 'edit-mode'>("view-mode")
    const [value, setValue] = useState('Привет')
    return (
        process.env.NODE_ENV === 'production' ? ''
            :
            <div className={cl.wrapper}>
                <div className={cl.modes}>
                    <div onClick={() => setActiveMode("view-mode")}
                         className={[activeMode === "view-mode" ? cl.modeActive : '', cl.mode].join(' ')}>Просмореть
                    </div>
                    <div onClick={() => setActiveMode("edit-mode")}
                         className={[activeMode === "edit-mode" ? cl.modeActive : '', cl.mode,].join(' ')}>Редактировать
                    </div>
                </div>
                {activeMode === "view-mode"
                    ? <Editor inputValue={value} setValue={setValue} readonly={true}/>
                    : <Editor inputValue={value} setValue={setValue} readonly={false}/>
                }
            </div>
    );
};

export default DocumentPage;
