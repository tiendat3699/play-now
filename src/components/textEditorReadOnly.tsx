import 'react-quill/dist/quill.bubble.css';

interface textEditorReadOnlyProps {
    value?: string;
}

function TextEditorReadOnly({ value }: textEditorReadOnlyProps) {
    const html = value ? value : '';
    return (
        <div className="ql-bubble ql-container">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}

export default TextEditorReadOnly;
