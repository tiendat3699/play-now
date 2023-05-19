import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Checkbox from '~/components/checkbox';
import ColorField from '~/components/colorField';
import DropDown from '~/components/dropdown';
import ImageUpload from '~/components/imageUpload';
import Page from '~/components/page';
import TextArea from '~/components/textArea';
import TextEditor from '~/components/textEditor';
import TextField from '~/components/textField';
import { option, typesGame } from '~/configs/category';
import InputFile from '~/components/inputFile';
import Button from '~/components/button';
import { gameService } from '~/services';
import { gameData } from '~/services';
import { releaseStatus } from '~/services/gameService';
import { useRouter } from 'next/router';
import { BiCheckCircle, BiError } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '~/firebase';

const Modal = dynamic(() => import('~/components/modal'), { ssr: false });

function Upload() {
    const [title, setTitle] = useState<string>('');
    const [titleColor, setTitleColor] = useState<string>('');
    const [shortDescription, setShortDescription] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<option>(typesGame[0]);
    const [comminsoon, setComminsoon] = useState<boolean>(false);
    const [coverImage, setCoverImage] = useState<File>();
    const [loaderFile, setLoaderFile] = useState<File>();
    const [dataFile, setDataFile] = useState<File>();
    const [frameworkFile, setFrameworkFile] = useState<File>();
    const [codeFile, setCodeFile] = useState<File>();
    const [user] = useAuthState(auth);

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<'loading' | 'success' | 'fail' | null>();
    const [url, setUrl] = useState<string>('');

    const router = useRouter();

    const handelSumbit = () => {
        const gamdata: gameData = {
            type: type.value,
            title,
            titleColor,
            description,
            shortDescription,
            poster: user?.displayName || 'Unname',
            status: comminsoon ? releaseStatus.comming : releaseStatus.release,
            coverImage,
            loaderFile,
            dataFile,
            frameworkFile,
            codeFile,
        };

        const fetch = async () => {
            try {
                setLoading('loading');
                const res = await gameService.store(gamdata);
                router.push('/games/' + res.id);
                setLoading('success');
                setUrl('games/' + res.id);
            } catch (err) {
                setLoading('fail');
                console.log(err);
            }
        };

        if (!title) {
            errors.push('Please enter title');
        }

        if (!description) {
            errors.push('Please enter description');
        }

        if (!coverImage) {
            errors.push('Please choose cover image');
        }

        if (!comminsoon) {
            if (!loaderFile) {
                errors.push('Please choose loader file');
            }

            if (!dataFile) {
                errors.push('Please choose data file');
            }

            if (!frameworkFile) {
                errors.push('Please choose framework file');
            }

            if (!codeFile) {
                errors.push('Please choose code file');
            }
        }

        if (errors.length > 0) {
            setErrors([...errors]);
        } else {
            fetch();
        }
    };

    return (
        <Page requrieAuth title="Upload your game">
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
                            <TextField
                                value={title}
                                onChange={setTitle}
                                label={'Title'}
                                rounded="rounded"
                                placeHolder="Name your game"
                                border
                            />
                        </div>
                        <div className="mb-3 flex sm:items-center justify-between flex-col sm:flex-row">
                            <div className="py-3">
                                <span className="font-medium text-sm">Genre: </span>
                                <DropDown onChange={setType} selectedOption={type} options={typesGame} />
                            </div>
                            <ColorField
                                onChange={setTitleColor}
                                label={{ text: 'Color Title', hint: 'Choose your color title for banner title' }}
                            />
                        </div>
                        <div className="mb-3">
                            <TextArea
                                value={shortDescription}
                                onChange={setShortDescription}
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
                                checked={comminsoon}
                                onChange={setComminsoon}
                                label="The game is not ready at the moment, I will update it later"
                            />
                            {!comminsoon && (
                                <div className="mt-1">
                                    <InputFile
                                        onChange={(files) => setLoaderFile(files[0])}
                                        label={{
                                            text: 'Upload loader script file',
                                            hint: 'The JavaScript code that the web page needs to load the Unity content',
                                        }}
                                        accept=".loader.js"
                                    />
                                    <InputFile
                                        onChange={(files) => setDataFile(files[0])}
                                        label={{
                                            text: 'Upload asset data file',
                                            hint: 'Asset data and Scene',
                                        }}
                                        accept=".data, .data.unityweb"
                                    />
                                    <InputFile
                                        onChange={(files) => setFrameworkFile(files[0])}
                                        label={{
                                            text: 'Upload framework script file',
                                            hint: 'JavaScript runtime and plug-ins',
                                        }}
                                        accept=".framework.js, .framework.js.unityweb"
                                    />
                                    <InputFile
                                        onChange={(files) => setCodeFile(files[0])}
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
                                value={description}
                                onChange={setDescription}
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
                                onChange={setCoverImage}
                                lable={{
                                    text: 'Cover image',
                                    hint: 'The cover image is used whenever playnow.io wants to link to your project from another part of the site',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="px-2 sm:px-8 pt-8 flex">
                    <Button onClick={handelSumbit} className="m-auto">
                        Save & Upload
                    </Button>
                </div>
            </div>
            <Modal closeButton closeOnClickOutSide visible={errors.length > 0} onHide={() => setErrors([])}>
                <div className="flex justify-center">
                    <BiError className="text-red-400 text-5xl mb-6" />
                </div>
                <div className=" space-y-1">
                    {errors.map((error, i) => (
                        <p key={i}>{error}</p>
                    ))}
                </div>
            </Modal>
            <Modal
                visible={!!loading}
                onHide={() => {
                    if (url) {
                        setLoading(null);
                        router.push(url);
                    } else {
                        setLoading(null);
                    }
                }}
                autoClose={loading == 'success' || loading == 'fail' ? 1500 : undefined}
            >
                <div className="text-5xl flex flex-col items-center">
                    {loading == 'loading' ? (
                        <>
                            <AiOutlineLoading3Quarters className="animate-spin mb-2" />
                            <p className="text-xl">Loading...</p>
                        </>
                    ) : loading == 'success' ? (
                        <>
                            <BiCheckCircle className="text-green-400 mb-2" />
                            <p className="text-xl">Upload success!</p>
                        </>
                    ) : (
                        <>
                            <BiError className="text-red-400 mb-2" />
                            <p className="text-xl">Upload Fail!</p>
                        </>
                    )}
                </div>
            </Modal>
        </Page>
    );
}

export default Upload;
