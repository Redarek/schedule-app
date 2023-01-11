import React, {FC, useState} from 'react';
import cl from './ContextMenu.module.css'
import {FileBrowserVoids, IObject, ObjectType} from "../../models/FileBrowser";

interface ContextMenuProps {
    type: ObjectType,
    event: React.MouseEvent | null;
    object?: IObject
    optionClick: (any: any, object?: any) => void
}

interface IOption {
    name: string,
    optionType: 'list' | 'option',
    options: [] | IOption[],
    void: string,
}

const ContextMenu: FC<ContextMenuProps> = ({event, type, optionClick, object}) => {
    const [isShow, setIsShow] = useState(false)

    let options: IOption[] = []
    switch (type) {
        case ObjectType.DIRECTORY:
            options = [
                {
                    name: 'Создать',
                    optionType: 'list',
                    void: '',
                    options: [
                        {
                            name: 'Создать папку',
                            optionType: 'option',
                            options: [],
                            void: FileBrowserVoids.CREATE_DIRECTORY,
                        },
                        {
                            name: 'Создать файл',
                            optionType: 'option',
                            options: [],
                            void: FileBrowserVoids.CREATE_FILE,
                        },
                    ]
                },
                {
                    name: 'Загрузить файл',
                    optionType: 'option',
                    void: FileBrowserVoids.UPLOAD_FILE,
                    options: []
                }
            ]
            break;
        case ObjectType.FILE: {
            options = [
                {
                    name: 'Удалить',
                    optionType: 'option',
                    void: FileBrowserVoids.DELETE,
                    options: []
                },
                {
                    name: 'Переименовать',
                    optionType: "option",
                    options: [],
                    void: FileBrowserVoids.RENAME,
                }
            ]
        }

    }

    const [hoverOption, setHoverOption] = useState<IOption>()


    const hideOptions = (option: IOption) => {
        if (hoverOption?.optionType === 'list') {
        } else {
            setIsShow(false)
            setHoverOption({} as IOption)
        }
    }
    const showOptions = (option: IOption) => {
        setHoverOption(option)
        setIsShow(false)
        if (option.optionType === "list") setIsShow(true)
    }

    const stylesOfHoverOption = (option: IOption) => {
        if (hoverOption?.name === option.name) {
            return {backgroundColor: '#dedede'}
        }
    }

    let left: string = `0`
    let flexDirection: 'row-reverse' | 'row' = 'row'
    if (event) {
        left = `${event.clientX}`
        if (window.innerWidth - event?.clientX < 405) left = `${event.clientX - 200}`
        if (window.innerWidth - event.clientX < 405) flexDirection = 'row-reverse'
        if (window.innerWidth - event.clientX < 405 && isShow) left = `${event.clientX - 405}`
    }

    return (
        <div className={cl.context}
             style={{
                 left: `${left}px`,
                 top: `calc(-35px + ${event?.clientY}px)`,
                 flexDirection: `${flexDirection}`
             }}
        >
            <div className={cl.options}>
                {options.map((option) =>
                    <div key={option.name}
                         className={cl.option}
                         onMouseEnter={() => showOptions(option)}
                         onMouseLeave={() => hideOptions(option)}
                         style={stylesOfHoverOption(option)}
                         onClick={() => optionClick(option.void, object)}
                    >
                        {option.name}
                    </div>
                )}
            </div>
            {isShow
                ? <div className={cl.additionalOptions}>
                    {hoverOption?.options.map((opt) =>
                        <div className={cl.option} key={opt.name}
                             onClick={() => optionClick(opt.void)}
                        >
                            {opt.name}
                        </div>
                    )}
                </div>

                : ''
            }
        </div>
    );
};

export default ContextMenu;
