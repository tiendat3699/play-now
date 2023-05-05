import Button from '~/components/button';
import ColorField from '~/components/colorField';
import Page from '~/components/page';
import TextField from '~/components/textField';

function Upload() {
    return (
        <Page title="Upload your game">
            <div className="mt-6 py-4 px-8 border rounded-md">
                <h1 className="text-lg font-medium mb-2 tracking-wide">Upload your game</h1>
                <p className="text-sm text-neutral-100/[0.6]">If you have a game you want to share, upload it here!</p>
                <div className="grid grid-cols-5 mt-8 gap-6">
                    <div className="col-span-3">
                        <div className="mb-3">
                            <TextField label={'Title'} style="rounded" placeHolder="Name your game" />
                        </div>
                        <div className="mb-3">
                            <ColorField
                                label={{ content: 'Color Title', hint: 'Choose your color title for banner title' }}
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <p className="text-xs text-neutral-100/[0.6] mt-2">
                            The cover image is used whenever playnow.io wants to link to your project from another part
                            of the site.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Upload;
