import { useRef } from 'react';
import Button from './button';

function ImageUpload() {
    const inputFileRef = useRef<HTMLInputElement>(null);

    return (
        <div className="h-72 flex border rounded-md border-dashed">
            <Button className="m-auto" onClick={() => inputFileRef.current?.click()}>
                Upload Cover Image
            </Button>
            <input ref={inputFileRef} className="hidden" type="file" accept="image/png, image/jpeg, image/gif" />
        </div>
    );
}

export default ImageUpload;
