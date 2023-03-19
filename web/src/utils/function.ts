export const typeUser = [
    {
        id: 1,
        type: "store"
    },
    {
        id: 2,
        type: "client"
    }
];

export const firstCapital = (word: string) => {
    return `${word[0].toUpperCase()}${word.substring(1)}`;
};
