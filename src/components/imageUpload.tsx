import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from './button';
import LabelHint, { label } from './labelHint';

type image = {
    file: File;
    preview: string;
};

interface ImageUploadProps {
    lable?: string | label;
    onChange?: (image: File) => any;
}

function ImageUpload({ lable, onChange }: ImageUploadProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<image | null>();

    useEffect(() => {
        if (image) {
            onChange?.(image.file);
        }
        return () => {
            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image, onChange]);

    const handleUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const file: File = e.target?.files[0];
            const preview: string = URL.createObjectURL(file);
            setImage({ file, preview });
        }
    };

    const handleRemoveImage = (): void => {
        if (image) {
            setImage(null);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {lable && <LabelHint label={lable} />}
            <div className="group flex-1 flex border rounded-lg border-dashed relative overflow-hidden">
                <div
                    className={`flex flex-col m-auto transition-opacity z-10 ${
                        image?.preview ? 'group-hover:opacity-100 opacity-0' : ''
                    }`}
                >
                    <Button onClick={() => inputFileRef.current?.click()} size="sm">
                        {image?.preview ? 'Replace Image' : ' Upload Image'}
                    </Button>
                    {image?.preview && (
                        <button
                            onClick={handleRemoveImage}
                            className="text-xs underline underline-offset-2 mt-1 font-semibold hover:text-accent"
                        >
                            Remove Image
                        </button>
                    )}
                </div>
                <input
                    onClick={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = '';
                    }}
                    onChange={handleUpload}
                    ref={inputFileRef}
                    className="hidden"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                />
                {image?.preview && (
                    <>
                        <Image
                            src={image.preview}
                            alt=""
                            width={100}
                            height={100}
                            className="w-full h-full object-cover object-center absolute top-0 right-0 bottom-0 left-0"
                            placeholder="empty"
                            blurDataURL="/placeholder.jpg"
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity" />
                    </>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;
