export type option = {
    value: string;
    lable: string;
};

export const category: option[] = [
    { lable: 'All', value: 'all' },
    { lable: 'Release', value: 'release' },
    { lable: 'Comming Soon', value: 'comming' },
];

export const typesGame: option[] = [
    { lable: 'Action', value: 'action' },
    { lable: 'Racing', value: 'racing' },
    { lable: 'Horror', value: 'horror' },
    { lable: 'Advanture', value: 'advanture' },
    { lable: 'Casual', value: 'casual' },
];

export const getCategory = (value?: string | null): option | undefined => {
    return category.find((option) => option.value == value);
};

export const getTypeGame = (value?: string | null): option | undefined => {
    return typesGame.find((option) => option.value == value);
};
