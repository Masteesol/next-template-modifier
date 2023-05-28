export const opacity = [
    "",
    `E6`,
    `B3`,
    `80`,
    `59`,
    `33`,
    `26`
];


const getOpacityTheme = (theme: string | null) => {
    const colors = theme ? opacity.map(opacity => theme + opacity) : [];
    return colors;
}

export default getOpacityTheme