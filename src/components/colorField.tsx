import { ReactNode, useState } from 'react';
import Tippy from '@tippyjs/react';
import { HexColorInput, HexAlphaColorPicker } from 'react-colorful';
import { default as TippyHeadless } from '@tippyjs/react/headless';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import 'tippy.js/dist/tippy.css';
import LabelHint, { label } from './labelHint';

interface ColorFieldProps {
    label: string | label;
}

function ColorField({ label }: ColorFieldProps) {
    const [color, setColor] = useState<string>('#000000');

    const renderPickColor = (props: any): ReactNode => (
        <div tabIndex={-1} {...props}>
            <HexAlphaColorPicker color={color} onChange={setColor} />
        </div>
    );

    return (
        <label className="inline-flex items-center">
            <div className="flex items-center mr-8">
                <LabelHint label={label} />
            </div>
            <div className="bg-neutral-100 flex items-center px-2 py-1 rounded">
                <HexColorInput
                    prefixed
                    alpha
                    className="text-sm font-medium text-secondary-1 inline-block w-[90px] mr-1 bg-transparent focus:outline-none"
                    color={color}
                    onChange={setColor}
                />
                <TippyHeadless interactive trigger="click" render={renderPickColor} placement="right" offset={[0, 20]}>
                    <span className="rounded h-6 w-9 bg-current" style={{ color }}></span>
                </TippyHeadless>
            </div>
        </label>
    );
}

export default ColorField;
