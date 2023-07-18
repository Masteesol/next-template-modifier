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
