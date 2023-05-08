import Tippy from '@tippyjs/react';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import 'tippy.js/dist/tippy.css';

export type label = {
    text: string;
    hint?: string;
};

interface labelHintProps {
    label: string | label;
    textSize?: 'xs' | 'sm' | 'md' | 'lg';
}

function LabelHint({ label, textSize }: labelHintProps) {
    let labelText: string | undefined = '';
    let hintText: string | undefined = '';
    if (typeof label == 'string') {
        labelText = label;
    } else {
        labelText = label?.text;
        hintText = label?.hint;
    }
    return (
        <div className="inline-flex items-center mb-1">
            <span className={`font-medium ${textSize ? 'text-' + textSize : 'text-sm'}`}>{labelText}</span>
            {hintText && (
                <Tippy placement="top" content={hintText} delay={[300, 0]}>
                    <span className="ml-1">
                        <HiQuestionMarkCircle />
                    </span>
                </Tippy>
            )}
        </div>
    );
}

export default LabelHint;
