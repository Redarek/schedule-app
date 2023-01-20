import {
    CompositeDecorator,
    DraftEditorCommand,
    DraftEntityMutability,
    DraftHandleValue,
    EditorState, getDefaultKeyBinding, KeyBindingUtil,
    RichUtils
} from 'draft-js';
import * as React from 'react';
import {BlockType, EntityType, InlineStyle, KeyCommand} from "./config";
import LinkDecorator from "./components/Link";
import {HTMLtoState, stateToHTML} from "./convert";


export type EditorApi = {
    state: EditorState;
    onChange: (state: EditorState) => void;
    toggleBlockType: (blockType: BlockType) => void;
    currentBlockType: BlockType;
    toggleInlineStyle: (inlineStyle: InlineStyle) => void;
    hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
    addLink: (url: string) => void;
    setEntityData: (entityKey: string, data: Record<string, string>) => void;
    handleKeyCommand: (
        command: KeyCommand,
        editorState: EditorState
    ) => DraftHandleValue;
    handlerKeyBinding: (e: React.KeyboardEvent) => KeyCommand | null;
    toHtml: () => string;
}

const decorator = new CompositeDecorator([LinkDecorator]);

export const useEditor = (html?: string): EditorApi => {
    // const [state, setState] = React.useState(() => EditorState.createEmpty(decorator));
    const [state, setState] = React.useState(() => html
        ? EditorState.createWithContent(HTMLtoState(html), decorator)
        : EditorState.createEmpty(decorator));

    const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle))
    }, []);


    const handleKeyCommand = React.useCallback(
        (command: KeyCommand, editorState: EditorState) => {
            if (command === "accent") {
                toggleInlineStyle(InlineStyle.ACCENT);
                return "handled";
            }

            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setState(newState);
                return "handled";
            }

            return "not-handled";
        },
        [toggleInlineStyle]
    );

    const handlerKeyBinding = React.useCallback((e: React.KeyboardEvent) => {
        /* Проверяем нажата ли клавиша q + ctrl/cmd */
        if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
            return 'accent';
        }

        return getDefaultKeyBinding(e);
    }, []);

    const addEntity = React.useCallback((entityType: EntityType, data: Record<string, string>, mutability: DraftEntityMutability) => {
        setState((currentState) => {
            /* Получаем текущий контент */
            const contentState = currentState.getCurrentContent();
            /* Создаем Entity с данными */
            const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
            /* Получаем уникальный ключ Entity */
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            /* Обьединяем текущее состояние с новым */
            const newState = EditorState.set(currentState, {currentContent: contentStateWithEntity});
            /* Вставляем ссылку в указанное место */
            return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
        })
    }, []);

    const toHtml = React.useCallback(() => {
        return stateToHTML(state.getCurrentContent());
    }, [state]);

    const addLink = React.useCallback(
        (url: string) => {
            addEntity(EntityType.link, {url}, "MUTABLE");
        },
        [addEntity]
    );


    const setEntityData = React.useCallback((entityKey: string, data: Record<string, string>) => {
        setState((currentState) => {
            /* Получаем текущий контент */
            const content = currentState.getCurrentContent();
            /* Объединяем текущие данные Entity с новыми */
            const contentStateUpdated = content.mergeEntityData(
                entityKey,
                data,
            )
            /* Обновляем состояние редактора с указанием типа изменения */
            return EditorState.push(currentState, contentStateUpdated, 'apply-entity');
        })
    }, []);

    const hasInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        /* Получаем иммутабельный Set с ключами стилей */
        const currentStyle = state.getCurrentInlineStyle();
        /* Проверяем содержится ли там переданный стиль */
        return currentStyle.has(inlineStyle);
    }, [state]);

    const currentBlockType = React.useMemo(() => {
        const selection = state.getSelection();
        const content = state.getCurrentContent();
        const block = content.getBlockForKey(selection.getStartKey());
        // console.log(block.toJS());
        return block.getType() as BlockType;
    }, [state]);

    const toggleBlockType = React.useCallback((blockType: BlockType) => {
        setState((currentState) => RichUtils.toggleBlockType(currentState, blockType))
    }, []);

    return React.useMemo(
        () => ({
            state,
            onChange: setState,
            toggleBlockType,
            currentBlockType,
            toggleInlineStyle,
            hasInlineStyle,
            addLink,
            setEntityData,
            handleKeyCommand,
            handlerKeyBinding,
            toHtml
        }),
        [state]
    )
}
