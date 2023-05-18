import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CgSearch, CgCheck } from 'react-icons/cg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { option } from './dropdown';
import TextField from './textField';
import { typesGame } from '~/configs/category';

interface FilterProps {
    onChange?: (options: option[]) => any;
}

function Filter({ onChange }: FilterProps) {
    const [seletedFilters, setSeletedFilters] = useState<option[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const handleSelectFilter = (filter: option) => {
        if (seletedFilters) {
            const indexFilter = seletedFilters.indexOf(filter);
            if (indexFilter != -1) {
                seletedFilters.splice(indexFilter, 1);
            } else {
                seletedFilters.push(filter);
            }

            setSeletedFilters([...seletedFilters]);
            onChange?.([...seletedFilters]);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-sm py-3">Filters ({seletedFilters ? seletedFilters?.length : 0})</span>
                <button
                    className="text-[11px] py-3 hover:text-neutral-100/[0.7]"
                    onClick={() => {
                        setSeletedFilters([]);
                        onChange?.([]);
                    }}
                >
                    RESET
                </button>
            </div>
            <div className="px-2">
                <TextField icon={<CgSearch />} rounded="rounded" placeHolder="Keywords" />
            </div>
            <div className="mt-2 px-2 before:block before:bg-secondary-1 before:h-px">
                <div className="flex flex-col">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="transition-colors flex items-center text-neutral-100/[0.6] text-xs mt-2 flex-1 px-2 py-3 -mx-2 text-left relative border border-transparent focus:border-current hover:text-neutral-100 rounded "
                    >
                        TYPE
                        <motion.div
                            animate={{ rotateZ: showFilters ? -180 : 0 }}
                            className="ml-auto text-3xl relative left-1"
                        >
                            <RiArrowDropDownLine />
                        </motion.div>
                    </button>
                    <ul className="mt-2 after:block after:bg-secondary-1 after:h-px">
                        {showFilters &&
                            typesGame.map((type, i) => {
                                const seleted = seletedFilters?.includes(type);
                                return (
                                    <li
                                        key={i}
                                        onClick={() => handleSelectFilter(type)}
                                        className={`transition-colors flex items-center px-3 py-3 mb-[5px] text-xs leading-6 rounded hover:text-neutral-100 cursor-pointer ${
                                            seleted ? 'bg-secondary-1 text-neutral-100' : 'text-neutral-100/[0.6]'
                                        }`}
                                    >
                                        {type.lable}
                                        <AnimatePresence>
                                            {seleted && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="relative left-2 ml-auto text-2xl"
                                                >
                                                    <CgCheck />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Filter;
