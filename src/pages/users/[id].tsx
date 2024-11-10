import { collection, getDocs } from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps } from 'next';
import Page from '~/components/page';
import { db } from '~/firebase';

function User() {
    return (
        <Page requrieAuth title="User">
            my games
        </Page>
    );
}

export default User;

export const getStaticPaths: GetStaticPaths = async () => {
    const userCollectionRef = collection(db, 'users');
    const users = await getDocs(userCollectionRef);
    const paths = users.docs.map((user) => {
        return { params: { id: user.id } };
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {},
    };
};
