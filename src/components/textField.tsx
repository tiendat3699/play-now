import { ReactNode } from 'react';
import LabelHint, { label } from './labelHint';

import 'tippy.js/dist/tippy.css';

interface TextFieldProps {
    label?: string | label;
    type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
    placeHolder?: string;
    icon?: ReactNode;
    rounded?: 'rounded-full' | 'rounded';
    border?: boolean;
}

function TextField({ label, type, icon, rounded, placeHolder, border }: TextFieldProps) {
    return (
        <label>
            {label && <LabelHint label={label} />}
            <div
                className={`w-full flex items-center px-3 bg-secondary-2 focus-within:bg-secondary-1 transition-colors duration-75 border ${
                    rounded || ''
                } ${border ? 'border-neutral-400' : 'border-transparent'}`}
            >
                {icon && <span className="text-sm ml-2 mr-1 text-[#ccc]">{icon}</span>}
                <input
                    type={type}
                    name="search"
                    className="block flex-1 border-0 outline-none bg-transparent py-2 px-2 text-white placeholder:text-neutral-400 text-sm sm:leading-6 rounded-full"
                    placeholder={placeHolder}
                    autoComplete="off"
                />
            </div>
        </label>
    );
}

export default TextField;
