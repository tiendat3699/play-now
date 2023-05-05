import Tippy from '@tippyjs/react';
import { ReactNode } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';

interface TextFieldProps {
    label?:
        | string
        | {
              hint?: string;
              content: string;
          };
    type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
    placeHolder?: string;
    icon?: ReactNode;
    style?: 'rounded-full' | 'rounded';
}

function TextField({ label, type, icon, style, placeHolder }: TextFieldProps) {
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
                className={`w-full flex items-center px-3 bg-secondary-2 focus-within:bg-secondary-1 transition-colors duration-75 ${
                    style || ''
                }`}
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
