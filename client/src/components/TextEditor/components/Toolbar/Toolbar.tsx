import React from 'react';
import {InlineStyle} from "../../config";
import {useEditorApi} from "../../context";

const INLINE_STYLES_CODES = Object.values(InlineStyle);

const Toolbar: React.FC = () => {
    const {toggleInlineStyle, hasInlineStyle, toHtml} = useEditorApi();
    const {addLink} = useEditorApi();


    const handlerAddLink = () => {
        const url = prompt('URL:');

        if (url) {
            addLink(url);
        }
    }

    return (
        <div className="tool-panel">
            {INLINE_STYLES_CODES.map((code) => {
                const onMouseDown = (e: React.MouseEvent) => {
                    e.preventDefault();
                    toggleInlineStyle(code);
                };

                return (
                    <button
                        key={code}
                        className={['tool-panel__item', hasInlineStyle(code) && "tool-panel__item_active"].join(' ')}
                        onMouseDown={onMouseDown}
                    >
                        {code}
                    </button>
                );
            })}
            <button onClick={handlerAddLink}>
                Добавить ссылку
            </button>
            <button onClick={()=> console.log(toHtml())}>Print</button>
        </div>
    );
};
export default Toolbar
