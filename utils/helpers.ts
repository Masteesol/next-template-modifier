import { Templates, TemplatesContainer } from "@/types/global";

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

export const updateTemplatesState = (
    categoryIndex: number,
    templateIndex: number,
    newTemplate: Templates,
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>
) => {
    setTextTemplates(prevTemplates => {
        const newTemplates = [...prevTemplates];
        // Copy the templates array of the category
        const categoryTemplates = [...newTemplates[categoryIndex].templates];
        // Replace the specific template with the new template
        categoryTemplates[templateIndex] = newTemplate;
        // Replace the category's templates array with the modified templates array
        newTemplates[categoryIndex] = {
            ...newTemplates[categoryIndex],
            templates: categoryTemplates,
        };
        return newTemplates;
    });
}

export const moveTemplateToNewCategory = (
    oldCategoryIndex: number,
    templateIndex: number,
    newCategoryId: string,
    textTemplates: TemplatesContainer[],
    newTextTemplatesSetter: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>
) => {
    let newTextTemplates = [...textTemplates];
    let templateToMove = newTextTemplates[oldCategoryIndex].templates[templateIndex];

    // Remove template from old category
    newTextTemplates[oldCategoryIndex].templates.splice(templateIndex, 1);

    // Find new category index
    const newCategoryIndex = newTextTemplates.findIndex(
        (category) => category.category_id === newCategoryId
    );

    if (newCategoryIndex === -1) {
        console.error('New category not found!');
        return;
    }

    // Update the order value of the template before moving it
    templateToMove = {
        ...templateToMove,
        order: newTextTemplates[newCategoryIndex].templates.length,
    };

    // Add the template to the new category
    newTextTemplates[newCategoryIndex].templates.push(templateToMove);

    newTextTemplatesSetter(newTextTemplates);
};
