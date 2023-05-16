import Link from 'next/link';

import { RiGithubFill, RiLinkedinBoxFill, RiHeartFill, RiPhoneFill } from 'react-icons/ri';
import { IoIosMail } from 'react-icons/io';

function Footer() {
    return (
        <footer className="bg-secondary-1 h-44 text-[#ccc] flex flex-col py-3 px-20">
            <ul className="flex m-auto space-x-4 text-4xl">
                <li className="transition-colors hover:text-[#ccc]/[0.7]">
                    <Link href={'https://github.com/tiendat3699'}>
                        <RiGithubFill />
                    </Link>
                </li>
                <li className="transition-colors hover:text-[#ccc]/[0.7]">
                    <Link href={'https://www.linkedin.com/in/ti%E1%BA%BFn-%C4%91%E1%BA%A1t-%C4%91inh-b5595223a/'}>
                        <RiLinkedinBoxFill />
                    </Link>
                </li>
                <li className="transition-colors hover:text-[#ccc]/[0.7]">
                    <Link href={'tel:0362231103'}>
                        <RiPhoneFill />
                    </Link>
                </li>
                <li className="transition-colors hover:text-[#ccc]/[0.7]">
                    <Link href={'mailto:tiendat361999@gmail.com'}>
                        <IoIosMail />
                    </Link>
                </li>
            </ul>
            <ul className="m-auto flex space-x-4 text-sm">
                <li className="underline underline-offset-2 hover:text-[#ccc]/[0.7] transition-colors">
                    <Link href="/about">About</Link>
                </li>
                <li className="underline underline-offset-2 hover:text-[#ccc]/[0.7] transition-colors">
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
            <p className="flex w-full items-center justify-center mt-auto mx-auto text-sm border-t border-[#ccc]/[0.2] pt-2">
                playnow.io developed by &nbsp;
                <strong className="text-accent">Tien Dat</strong>
                &nbsp; with a lots of love! &nbsp;
                <RiHeartFill className="text-[red] text-lg" />
            </p>
        </footer>
    );
}

export default Footer;
