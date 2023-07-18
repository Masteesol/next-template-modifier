export const saveMessage = (setSaveStatus: any, message = "Saved Changes") => {
    setSaveStatus(message)
    setTimeout(() => { setSaveStatus("") }, 2000)
}