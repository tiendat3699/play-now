import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { RxCheck } from 'react-icons/rx';

interface CheckboxProps {
    label?: string;
    defaulValue?: boolean;
    onCheck?: (checked: boolean) => void;
}

function Checkbox({ defaulValue, label, onCheck }: CheckboxProps) {
    const [checked, setChecked] = useState<boolean>(defaulValue ? defaulValue : false);

    useEffect(() => {
        !!onCheck && onCheck(checked);
    }, [checked, onCheck]);

    const handelChange = (): void => {
        setChecked(!checked);
    };

    return (
        <label className="inline-flex items-center">
            <div className="relative flex bg-secondary-1 rounded">
                <input
                    checked={checked}
                    type="checkbox"
                    onChange={handelChange}
                    className="w-4 h-4 z-10 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 appearance-none focus:ring-1 border-secondary-2"
                />
                <AnimatePresence>
                    {checked && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ ease: 'easeInOut', duration: 0.1 }}
                            className="text-white absolute top-0 right-0 bottom-0 left-0 text-center flex"
                        >
                            <RxCheck className="m-auto" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            {label && <span className="ml-2 text-sm font-medium">{label}</span>}
        </label>
    );
}

export default Checkbox;
