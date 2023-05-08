import LabelHint, { label } from './labelHint';

interface InputFileProps {
    label?: label | string;
    accept?: string;
    multiple?: boolean;
}

function InputFile({ label, accept, multiple }: InputFileProps) {
    return (
        <div className="mb-1">
            {label && <LabelHint textSize="xs" label={label} />}
            <input
                className=" file:hover:bg-gray-400 file:transition-colors file:px-3 file:mr-4 file:cursor-pointer file:h-8 file:font-medium file:text-neutral-100 file:bg-gray-500 file:border-0 block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                type="file"
                accept={accept}
                multiple={multiple}
            />
        </div>
    );
}

export default InputFile;
