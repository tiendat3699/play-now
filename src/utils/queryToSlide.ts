import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Slide } from '~/components/bannerCarousel';

const queryToSlide = (query?: QuerySnapshot<DocumentData>, prefixLink?: string): Slide[] => {
    if (!query) return [];
    return query.docs.map<Slide>((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            banner: data.coverImageUrl,
            title: data.title,
            description: data.shortDescription,
            titleColor: data.titleColor,
            status: data.status,
            link: prefixLink ? `${prefixLink}/${doc.id}` : '/' + doc.id,
        };
    });
};

export default queryToSlide;
