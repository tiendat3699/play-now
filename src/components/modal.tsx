'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    children: ReactNode;
    visible?: boolean;
    closeOnClickOutSide?: boolean;
    autoClose?: number;
    closeButton?: boolean;
    onHide?: () => any;
}

function Modal({ children, visible, closeOnClickOutSide, autoClose, closeButton, onHide }: ModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setOpen(visible ? visible : false);
    }, [visible]);

    useEffect(() => {
        let timer: any = null;
        if (autoClose) {
            timer = setTimeout(() => {
                setOpen(false);
            }, autoClose);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [autoClose]);

    return createPortal(
        <AnimatePresence
            onExitComplete={() => {
                onHide?.();
            }}
        >
            {open && (
                <div className="fixed top-0 right-0 left-0 bottom-0 z-[9999] flex">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => closeOnClickOutSide && setOpen(false)}
                        className="absolute w-full h-full bg-black/[0.6]"
                    ></motion.div>
                    <motion.div
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="bg-gray-700 text-white m-auto rounded-md z-10 min-w-[150px] relative"
                    >
                        {closeButton && (
                            <button
                                onClick={() => setOpen(false)}
                                className="text-neutral-100 bg-red-500 rounded-full p-1 hover:text-red-500 hover:bg-neutral-100 transition-colors absolute -top-1 -right-2 ring-2"
                            >
                                <IoClose />
                            </button>
                        )}
                        <div className="px-6 py-4">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

export default Modal;
