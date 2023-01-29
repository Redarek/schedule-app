import React, {FC} from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import './Editor.css'

interface EditorProps {
    inputValue: string;
    setValue: (str: string) => void;
    readonly: boolean
}

const Editor: FC<EditorProps> = ({inputValue, setValue, readonly}) => {


        // const [value, setValue] = useState(inputValue)
        const Quill = ReactQuill.Quill
        let Font = Quill.import('formats/font');
        Font.whitelist = ['Arial', 'times', 'Raleway'];
        Quill.register(Font, true);
        const modules = {
            // toolbar: '#toolbar'
            toolbar: [
                [{header: [false, 1, 2, 3, 4, 5, 6],}],
                [{font: ['Arial', 'times', 'Raleway']}],
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'align': []}],
                [
                    {list: 'ordered'},
                    {list: 'bullet'},
                    {indent: '-1'},
                    {indent: '+1'},
                ],
                ['link', 'image', 'video'],
                [{'script': 'sub'}, {'script': 'super'}],
                // ['clean'],
            ]
        }
        const toolbar = document.querySelector('.ql-toolbar')

        if (readonly && toolbar) {
            toolbar.classList.add('hide-toolbar')
        } else {
            if (toolbar)
                toolbar.classList.remove('hide-toolbar')
        }

        const style = () => {
            let height = `calc(100vh - 75px)`
            if (readonly) {
                // return {height: 'calc(100vh - 75px)'}
            } else {
                if (window.innerWidth > 860) {
                    height = 'calc(100vh - 75px - 42px)'
                    // return {height: 'calc(100vh - 75px - 42px)'}
                }
                if (window.innerWidth < 520) {
                    height = 'calc(100vh - 75px - 90px)'
                    // return {height: 'calc(100vh - 75px - 90px)'}
                } else {
                    height = 'calc(100vh - 75px - 66px)'
                    // return {height: 'calc(100vh - 75px - 66px)'}
                }
            }
            return {height: height, width: '100%'}
        }
        return (
            <ReactQuill
                style={style()}
                theme={'snow'}
                value={inputValue}
                onChange={setValue}
                modules={modules}
                readOnly={readonly}
            />
        );
    }
;

export default Editor;
