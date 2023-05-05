import Link from 'next/link';
import { CgSearch } from 'react-icons/cg';
import TextField from './textField';

function SearchBar() {
    return (
        <div className="flex items-center h-24 sticky top-0 z-50 bg-primary">
            <div className="w-64">
                <TextField icon={<CgSearch />} style="rounded-full" placeHolder="Search games" />
            </div>
            <ul className="flex text-neutral-100 text-sm tracking-wider items-center mx-4">
                <li className=" transition-opacity ease-in-out opacity-70 hover:opacity-100">
                    <Link href={'/'} className="flex items-center h-10 px-3">
                        Popular
                    </Link>
                </li>
                <li className=" transition-opacity ease-in-out opacity-70 hover:opacity-100">
                    <Link href={'/'} className="flex items-center h-10 px-3">
                        New
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SearchBar;
