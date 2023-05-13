'use client';

import { useMemo, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import { ReactQuillProps } from 'react-quill';

import { CgUndo, CgRedo } from 'react-icons/cg';

interface CustomReactQuillProps extends ReactQuillProps {
    forwardedRef: any;
}

import 'react-quill/dist/quill.snow.css';
import 'tippy.js/dist/tippy.css';
import LabelHint, { label } from './labelHint';

//fix document is not defined, ReactQuill cant render in rendering server side because DOM is not available
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        const setIcons = async () => {
            const icons = await RQ.Quill?.import('ui/icons');
            if (icons) {
                icons['undo'] = renderToString(<CgUndo />);
                icons['redo'] = renderToString(<CgRedo />);
            }
        };

        setIcons();

        // eslint-disable-next-line react/display-name
        return ({ forwardedRef, ...props }: CustomReactQuillProps) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false,
        loading: () => <div className="h-80 rounded animate-pulse bg-secondary-1" />,
    },
);

interface TextEditorProps {
    label?: string | label;
    value?: string;
    onChange?: (value: string) => any;
}

function TextEditor({ label, value, onChange }: TextEditorProps) {
    const editorRef = useRef<any>();

    const Undo = () => {
        const editor = editorRef.current?.getEditor();
        return editor.history.undo();
    };
    const Redo = () => {
        const editor = editorRef.current?.getEditor();
        return editor.history?.redo();
    };
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ color: [] }, { background: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
                    ['link', 'clean'],
                    ['undo', 'redo'],
                ],
                handlers: {
                    undo: Undo,
                    redo: Redo,
                },
            },
        }),
        [],
    );

    return (
        <>
            {label && <LabelHint label={label} />}
            <ReactQuill
                value={value}
                onChange={(value) => onChange?.(value)}
                forwardedRef={editorRef}
                modules={{ ...modules }}
            />
        </>
    );
}

export default TextEditor;
