import { GetStaticPaths, GetStaticProps } from 'next';

function GameDetail() {
    return 'games';
}

export default GameDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const arr: string[] = ['slug1', 'slug2'];
    const paths = arr.map((slug) => {
        return {
            params: { slug },
        };
    });
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`https://swapi.dev/api/people/`);
    return {
        props: {},
    };
};
