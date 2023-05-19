import { ReactNode, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { option } from '~/configs/category';

interface DropDownProps {
    options: option[];
    placeHolder?: string;
    selectedOption?: option;
    onChange?: (value: option) => any;
}

function DropDown({ options, placeHolder, selectedOption, onChange }: DropDownProps) {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const handleSelect = (option: option) => {
        onChange?.(option);
        setShowOptions(false);
    };

    const renderOptions = (prop: any): ReactNode => (
        <ul tabIndex={-1} className="bg-secondary-2 pt-3 pb-3 rounded-md min-w-full" {...prop}>
            {options.map((option, i) => {
                const selected = selectedOption?.value == option.value;
                return (
                    <li
                        key={i}
                        onClick={() => {
                            handleSelect(option);
                        }}
                        className={`py-3 px-4 hover:bg-white/[0.13] text-sm transition-colors cursor-pointer ${
                            selected ? 'bg-white/[0.13]' : ''
                        }`}
                    >
                        {option.lable}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className="inline-block">
            <Tippy
                zIndex={40}
                visible={showOptions}
                onClickOutside={(instance, e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest('body') || !target.closest('html')) {
                        setShowOptions(false);
                    }
                }}
                interactive
                placement="bottom-start"
                offset={[0, 0]}
                render={renderOptions}
            >
                <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="flex items-center border border-transparent focus:border-neutral-100 p-1 rounded text-sm"
                >
                    {selectedOption ? selectedOption.lable : placeHolder || 'Select Option'}
                    <motion.div animate={{ rotateZ: showOptions ? -180 : 0 }}>
                        <RiArrowDropDownLine className="text-2xl" />
                    </motion.div>
                </button>
            </Tippy>
        </div>
    );
}

export default DropDown;
