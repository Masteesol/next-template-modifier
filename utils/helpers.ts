export const saveMessage = (setSaveStatus: any, message = "Saved Changes") => {
    setSaveStatus(message)
    setTimeout(() => { setSaveStatus("") }, 2000)
}

export function objectsAreEqual(a: any, b: any) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

export const getColorForCount = (count: number, limit: number): string => {
    const ratio = count / limit;
    if (ratio >= 1) return 'text-red-600'; // Adjust color for 100% and above
    if (ratio >= 0.90) return 'text-yellow-400'; // Adjust color for 80% to 99%
    if (ratio < 0.90) return 'text-green-500'; // Adjust color for 80% to 99%
    return 'text-gray-500'; // Default color
};