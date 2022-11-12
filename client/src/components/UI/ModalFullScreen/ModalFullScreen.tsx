import React, {FC} from 'react';
import cl from './ModalFullScreen.module.css'

interface ModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    children: React.ReactNode;
    exitBtn: boolean;
    exitBackground: boolean;
}

const ModalFullScreen: FC<ModalProps> = ({visible, setVisible, children, exitBtn, exitBackground}) => {
    const rootClasses = [cl.modal];
    if (visible) {
        rootClasses.push(cl.active);
    }

    const closeModal = () => {
        if (exitBackground && !exitBtn) setVisible(!visible)
        if (exitBtn && exitBackground) setVisible(!visible)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => closeModal()}>
            <div className={cl.modalContent} onClick={event => event.stopPropagation()}>
                {exitBtn
                    ? <div className={cl.exitBtn} onClick={() => setVisible(false)}><span></span><span></span></div>
                    : ''
                }
                {children}
            </div>
        </div>
    );
};

export default ModalFullScreen;
