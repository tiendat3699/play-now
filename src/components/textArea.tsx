import Tippy from '@tippyjs/react';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import 'tippy.js/dist/tippy.css';

interface TextAreaProps {
    row?: number;
    label?:
        | string
        | {
              hint?: string;
              content: string;
          };
    placeHolder?: string;
    border?: boolean;
}

function TextArea({ row, label, placeHolder, border }: TextAreaProps) {
    let labelText: string | undefined = '';
    let hintText: string | undefined = '';
    if (typeof label == 'string') {
        labelText = label;
    } else {
        labelText = label?.content;
        hintText = label?.hint;
    }
    return (
        <label>
            {labelText && (
                <div className="inline-flex items-center mb-1">
                    <span className="text-sm font-medium">{labelText}</span>
                    {hintText && (
                        <Tippy placement="top" content={hintText} delay={[300, 0]}>
                            <span className="ml-1">
                                <HiQuestionMarkCircle />
                            </span>
                        </Tippy>
                    )}
                </div>
            )}
            <div
                className={`w-full flex items-center bg-secondary-2 focus-within:bg-secondary-1 transition-colors duration-75 rounded border ${
                    border ? 'border-neutral-400' : 'border-transparent'
                }`}
            >
                <textarea
                    rows={row}
                    placeholder={placeHolder}
                    className="w-full block flex-1 border-0 outline-none bg-transparent py-2 px-2 text-white placeholder:text-neutral-400 text-sm sm:leading-6 rounded"
                />
            </div>
        </label>
    );
}

export default TextArea;
