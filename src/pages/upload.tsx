import { useState } from 'react';
import Link from 'next/link';
import Checkbox from '~/components/checkbox';
import ColorField from '~/components/colorField';
import DropDown from '~/components/dropdown';
import ImageUpload from '~/components/imageUpload';
import Page from '~/components/page';
import TextArea from '~/components/textArea';
import TextEditor from '~/components/textEditor';
import TextField from '~/components/textField';
import { genres } from '~/configs/category';
import InputFile from '~/components/inputFile';
import Button from '~/components/button';
import LabelHint from '~/components/labelHint';

function Upload() {
    const [comminsoon, setComminsoon] = useState<boolean>(false);

    return (
        <Page title="Upload your game">
            <div className="mt-6 overflow-hidden border rounded-md pb-4">
                <div className="bg-secondary-1 px-8 py-6">
                    <h1 className="text-lg font-medium mb-2 tracking-wide">Upload your game</h1>
                    <p className="text-sm text-neutral-100/[0.6]">
                        If you have a game you want to share, upload it here!
                    </p>
                </div>
                <div className="grid grid-cols-5 pt-8 gap-6 px-2 sm:px-8">
                    <div className="lg:col-span-3 col-span-5 lg:order-1 order-2">
                        <div className="mb-3">
                            <TextField label={'Title'} rounded="rounded" placeHolder="Name your game" border />
                        </div>
                        <div className="mb-3 flex sm:items-center justify-between flex-col sm:flex-row">
                            <div className="py-3">
                                <span className="font-medium text-sm">Genre: </span>
                                <DropDown initValue={genres[0]} options={genres} />
                            </div>
                            <ColorField
                                label={{ text: 'Color Title', hint: 'Choose your color title for banner title' }}
                            />
                        </div>
                        <div className="mb-3">
                            <TextArea
                                row={3}
                                label={{
                                    content: 'Short description',
                                    hint: 'Displayed in banner description or preview',
                                }}
                                placeHolder="Optional"
                                border
                            />
                        </div>
                        <div className="mb-3">
                            <p className="text-sm font-medium mb-4">Uploads</p>
                            <Checkbox
                                onCheck={setComminsoon}
                                label="The game is not ready at the moment, I will update it later"
                            />
                            {!comminsoon && (
                                <div className="mt-1">
                                    <InputFile
                                        label={{
                                            text: 'Upload loader script file',
                                            hint: 'The JavaScript code that the web page needs to load the Unity content',
                                        }}
                                        accept=".loader.js"
                                    />
                                    <InputFile
                                        label={{
                                            text: 'Upload asset data file',
                                            hint: 'Asset data and Scene',
                                        }}
                                        accept=".data, .data.unityweb"
                                    />
                                    <InputFile
                                        label={{
                                            text: 'Upload framework script file',
                                            hint: 'JavaScript runtime and plug-ins',
                                        }}
                                        accept=".framework.js, .framework.js.unityweb"
                                    />
                                    <InputFile
                                        label={{
                                            text: 'Upload WebAssembly file',
                                            hint: 'WebAssembly binary file',
                                        }}
                                        accept=".wasm, .wasm.unityweb"
                                    />
                                    <p className="text-xs text-neutral-100/[0.8] mt-4">
                                        Don&apos;t know how to build webGL from Unity?
                                        <Link
                                            href="https://docs.unity3d.com/Manual/webgl-building.html"
                                            className="ml-1 text-accent hover:underline"
                                            target="_blank"
                                        >
                                            Check This
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <TextEditor
                                label={{
                                    text: 'Description',
                                    hint: 'This will make up the content of your game page',
                                }}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2 col-span-5 lg:order-2 order-1">
                        <div className="lg:h-80 md:h-72 h-44 mb-4">
                            <ImageUpload
                                lable={{
                                    text: 'Cover image',
                                    hint: 'The cover image is used whenever playnow.io wants to link to your project from another part of the site',
                                }}
                            />
                        </div>
                        <LabelHint
                            label={{
                                text: 'Screenshots',
                                hint: 'Screenshots will appear on your game&apos;s page. Optional but highly recommended',
                            }}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <div className="lg:h-40 h-36">
                                <ImageUpload />
                            </div>
                            <div className="lg:h-40 h-36">
                                <ImageUpload />
                            </div>
                            <div className="lg:h-40 h-36">
                                <ImageUpload />
                            </div>
                            <div className="lg:h-40 h-36">
                                <ImageUpload />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-2 sm:px-8 pt-8 flex">
                    <Button className="m-auto">Save & view page</Button>
                </div>
            </div>
        </Page>
    );
}

export default Upload;
