import React, {FC} from 'react';
import {IObject} from "../../models/FileBrowser";
//@ts-ignore
// import GoogleDocsViewer from 'react-google-docs-viewer';

interface DocViewerComponentProps {
    doc: IObject
}

const DocViewerComponent: FC<DocViewerComponentProps> = ({doc}) => {
    console.log(
    window.innerHeight
    )
    // const height =
    return (
        <div>
            {/*<GoogleDocsViewer*/}
            {/*    width="600px"*/}
            {/*    height="650px"*/}
            {/*    fileUrl="http://www.africau.edu/images/default/sample.pdf"*/}
            {/*/>*/}
        </div>
    );
};

export default DocViewerComponent
