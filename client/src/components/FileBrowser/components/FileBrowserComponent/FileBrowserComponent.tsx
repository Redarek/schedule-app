import React, {Fragment, useState} from 'react';
import cl from './FileBrowserComponent.module.css'
import {FileBrowser, FileBrowserVoids, IObject, ObjectType} from "../../models/FileBrowser";
import ContextMenu from "../ContextMenu/ContextMenu";
import ModalFullScreen from "../../../UI/ModalFullScreen/ModalFullScreen";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import {FormValidator} from "../../../UI/Input/models/FormValidator";
import {InputNames} from "../../../UI/Input/models/InputValidator";
import DocViewerComponent from "../DocViewer/DocViewerComponent";


const FileBrowserComponent = () => {
    let isMobile = false
    if (window.innerWidth < 760) isMobile = true;

    const directories: IObject[] = [
        {
            name: 'Первая папка',
            type: ObjectType.DIRECTORY,
            uri: '',
            content: [
                {
                    name: 'Папка в первой папке',
                    type: ObjectType.DIRECTORY,
                    uri: '',
                    content: [
                        {
                            name: 'test-doc.pdf',
                            type: ObjectType.FILE,
                            content: [],
                            uri: '/test-doc.pdf',
                        },
                        {
                            name: 'Папка а в ней папка а в ней папка',
                            type: ObjectType.DIRECTORY,
                            uri: '',
                            content: [
                                {
                                    name: 'file в глубине.docx',
                                    type: ObjectType.FILE,
                                    content: [],
                                    uri: '/234.pdf',
                                },
                            ]
                        }
                    ]
                },
            ]
        },
        {
            name: 'test.txt',
            type: ObjectType.FILE,
            content: [],
            uri: "/test.txt",
        },
        {
            name: 'Вторая папка',
            type: ObjectType.DIRECTORY,
            uri: '',
            content: [
                {
                    name: 'Папка во второй папке',
                    type: ObjectType.DIRECTORY,
                    uri: '',
                    content: [
                        {
                            name: 'file.txt',
                            type: ObjectType.FILE,
                            content: [],
                            uri: '',
                        }
                    ]
                },
                {
                    name: 'test2.txt',
                    type: ObjectType.FILE,
                    content: [],
                    uri: '/test2.txt',
                },
            ]
        }
    ]

    const [fileBrowser, setFileBrowser] = useState<FileBrowser>(new FileBrowser(directories))

    const [isShowContextMenu, setIsShowContextMenu] = useState<boolean>(false)

    const [contextType, setContextType] = useState<ObjectType>(ObjectType.DIRECTORY)

    const [event, setEvent] = useState<React.MouseEvent | null>(null)

    const [nameOfObject, setNameOfObject] = useState<string>('')

    const [currentContextObject, setCurrentContextObject] = useState<IObject>({} as IObject)

    function contextMenu(e: React.MouseEvent, contextType: ObjectType, object?: IObject) {
        e.stopPropagation()
        e.preventDefault()
        if (object) setCurrentContextObject(object)
        setEvent(e)
        switch (contextType) {
            case ObjectType.DIRECTORY:
                setContextType(ObjectType.DIRECTORY)
                break
            case ObjectType.FILE:
                setContextType(ObjectType.FILE)
                break
            default:
                break;
        }
        setIsShowContextMenu(true)
    }

    //Навигация и поиск в каталогах start

    let searchedDirectory = {} as IObject
    const findInDirectory = (address: string, directory: IObject) => {
        for (let i = 0; i < directory.content.length; i++) {
            if (directory.content[i].type === ObjectType.DIRECTORY) findInDirectory(address, directory.content[i])
        }
        if (directory.name === address) searchedDirectory = directory
    }

    function handleNavigateToDirectory(address: string) {
        let obj: IObject = {} as IObject
        for (let i = 0; i < directories.length; i++) {
            if (!obj.name) {
                if (directories[i].type === ObjectType.DIRECTORY) {
                    findInDirectory(address, directories[i])
                    if (searchedDirectory.name === address) {
                        obj = searchedDirectory
                    }
                }
            }
        }
        fileBrowser.setDirectoryAddress(obj.name)
        if (address === 'Files') setFileBrowser(new FileBrowser(directories))
        else {
            setFileBrowser(new FileBrowser(obj.content, fileBrowser.getCurrentDirectoryAddress().toString()))
        }
    }

    //Навигация и поиск в каталогах end


    function handleClick(e: React.MouseEvent, object: IObject) {
        if (isMobile) {
            switch (object.type) {
                case ObjectType.DIRECTORY:
                    let newUrl = fileBrowser.getCurrentDirectoryAddress() + ',' + object.name
                    setFileBrowser(new FileBrowser(object.content, newUrl))
                    break;
            }
        }

        if (e.detail === 2) {
            switch (object.type) {
                case ObjectType.DIRECTORY:
                    let newUrl = fileBrowser.getCurrentDirectoryAddress() + ',' + object.name
                    setFileBrowser(new FileBrowser(object.content, newUrl))
                    break;
                case ObjectType.FILE:
                    setCurrentContextObject(object)
                    setEditMode(true)
                    break;
            }
        }
    }

    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [typeOfOption, setTypeOfOption] = useState<FileBrowserVoids.CREATE_FILE | FileBrowserVoids.CREATE_DIRECTORY | null | FileBrowserVoids.RENAME>(null)

    function handleChangeContent(e: React.MouseEvent) {
        e.preventDefault()
        if (typeOfOption)
            if (typeOfOption === FileBrowserVoids.RENAME) {
                fileBrowser.clickOption(typeOfOption, nameOfObject, currentContextObject)
            } else {
                fileBrowser.clickOption(typeOfOption, nameOfObject)
            }
        setNameOfObject('')
        setIsShowModal(false)
    }

    const handleClickOnOption = (str: FileBrowserVoids, obj?: IObject) => {
        if (str === FileBrowserVoids.CREATE_FILE || str === FileBrowserVoids.CREATE_DIRECTORY || str === FileBrowserVoids.RENAME) {
            setNameOfObject('')
            if (str === FileBrowserVoids.RENAME) {
                if (obj)
                    setNameOfObject(obj?.name)
            }
            setIsShowModal(true)
            setTypeOfOption(str)
        } else {
            fileBrowser.clickOption(str, nameOfObject, obj)
        }
    }

    const inputs = [InputNames.FILE_NAME]
    const formValidator = new FormValidator(inputs)


    const [editMode, setEditMode] = useState(false)

    return (
        <div className={cl.browser}
             onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
             onClick={() => setIsShowContextMenu(false)}>
            <div className={cl.browserNav}>
                {fileBrowser.getCurrentDirectoryAddress().map((directoryAdd) =>
                    <Fragment key={directoryAdd}>
                        <div
                            onClick={() => handleNavigateToDirectory(directoryAdd)}
                        >
                            {directoryAdd}
                        </div>
                        /
                    </Fragment>
                )}
            </div>

            {!editMode
                ?
                <div className={cl.browserWorkSpace} id={'work-space'}
                     onContextMenu={(e: React.MouseEvent) => contextMenu(e, ObjectType.DIRECTORY)}>
                    <div className={cl.browserContent}>
                        {fileBrowser.getContent().map((obj, index) =>
                            <div
                                key={index}
                                className={cl.browserObject}
                                onContextMenu={(e: React.MouseEvent) => contextMenu(e, ObjectType.FILE, obj)}
                                onClick={(e: React.MouseEvent) => handleClick(e, obj)}
                            >
                                <div className={cl.objectImg}>
                                    {obj.type === ObjectType.DIRECTORY
                                        ? <img src="/images/folder.png" alt="img"/>
                                        : <span>.{obj.name.split('.')[1]}</span>
                                    }
                                </div>
                                <div className={cl.objectName}>
                                    {obj.name}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                : <DocViewerComponent doc={currentContextObject}/>
            }
            {isShowContextMenu
                ? <ContextMenu
                    event={event}
                    type={contextType}
                    optionClick={handleClickOnOption}
                    object={currentContextObject}
                />
                : ''
            }
            {isShowModal
                ?
                <ModalFullScreen visible={isShowModal} setVisible={setIsShowModal} exitBtn={true} exitBackground={true}>
                    <form className={cl.createForm}>
                        <Input
                            id={'file-name'}
                            type={'text'}
                            name={InputNames.FILE_NAME}
                            formValidator={formValidator}
                            indexInValidator={0}
                            value={nameOfObject}
                            setValue={setNameOfObject}
                            placeholder={'Название'}
                        />
                        <Button
                            onClick={handleChangeContent}>
                            {typeOfOption === FileBrowserVoids.RENAME
                                ? 'Переименовать'
                                : 'Создать'
                            }
                        </Button>
                    </form>
                </ModalFullScreen>
                : ''
            }
        </div>
    );
};

export default FileBrowserComponent;
