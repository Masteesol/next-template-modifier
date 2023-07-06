
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()
import { v4 as uuidv4 } from 'uuid';

export const updateCategory = async (newCatTitle: string, category_id: string, userID: string) => {
    try {
        const { data, error } = await supabase
            .from("categories")
            .update({ category_name: newCatTitle })
            .eq("category_id", category_id)
            .match({ user_id: userID })
            .select()
        if (error) {
            return error
        }
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateTemplate = async (newTitle: string, newText: string, userID: string, template_id: string) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({ title: newTitle, text: newText })
            .eq("template_id", template_id)
            .match({ user_id: userID })
            .select()
        if (error) {
            return error
        }
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchTemplatesForUser = async (userId: string | undefined | null) => {
    if (!userId) {
        return Promise.resolve(null); // or some other default value
    }
    console.log("userId", userId)
    try {
        const { data, error } = await supabase
            .from('categories')
            .select(`
            category_id,
            category_name,
            templates (template_id, title, text)
          `)
            .eq('user_id', userId)
        if (error) {
            console.log("Fetch templates error", error)
        }
        return data;
    } catch (error) {
        console.log("error", error)
    }
};

interface Templates {
    title: string;
    text: string;
    template_id: string;
}


interface TemplatesContainer {
    category_id: string;
    category_name: string;
    templates: Templates[];
}

export const createCategory = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    setSelectedCategory: React.Dispatch<React.SetStateAction<number>>
) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .insert([{
                category_name: "New Category",
                user_id: userID
            }])
            .select()
        if (data) {
            const newCategory = data[0]
            console.log(newCategory)
            const { category_id, category_name } = newCategory

            const newCategoryWithTemplates: TemplatesContainer = {
                category_id: category_id,
                category_name: category_name,
                templates: []
            }
            const updatedTextTemplates = [newCategoryWithTemplates, ...textTemplates];

            setTextTemplates(updatedTextTemplates);
            setSelectedCategory(0);
        } else {
            console.log("Error creating category", error)
        }

    } catch (error) {
        console.error("Failed to create category:", error);
    }
}

export const createTemplate = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    selectedCategory: number
) => {
    try {
        const newID = uuidv4()
        const { data, error } = await supabase
            .from('templates')
            .insert([{
                template_id: newID,
                title: "New Template",
                text: "Template text...",
                category_id: textTemplates[selectedCategory].category_id,
                user_id: userID
            }])
            .select()
        console.log(data)
        if (error) {
            console.log("Error creating template", error)
        }
        if (data) {
            const newTemplate = data[0]
            const updatedTemplates = [newTemplate, ...textTemplates[selectedCategory].templates];
            const updatedTextTemplates = textTemplates.map((item, index) => {
                if (index === selectedCategory) {
                    return {
                        ...item,
                        templates: updatedTemplates,
                    };
                }
                return item;
            });
            setTextTemplates(updatedTextTemplates);
        }


        console.log("new text templates", textTemplates)
    } catch (error) {
        console.error("Failed to create template:", error);
    }
}

export const deletedTemplate = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    selectedCategory: number,
    template_id: string,
    index: number
) => {
    try {
        const { error } = await supabase
            .from('templates')
            .delete()
            .eq("template_id", template_id)
            .match({ user_id: userID })
        if (error) {
            console.log("Error deleting template", error)
        } else {
            const updatedTemplates = textTemplates[selectedCategory].templates.filter((_, i) => i !== index);
            const updatedTextTemplates = textTemplates.map((item, index) => {
                if (index === selectedCategory) {
                    return {
                        ...item,
                        templates: updatedTemplates,
                    };
                }
                return item;
            });
            setTextTemplates(updatedTextTemplates);
        }
    } catch (error) {
        console.error("Failed to create template:", error);
    }
}


export const deletedCategory = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    setSelectedCategory: React.Dispatch<React.SetStateAction<number>>,
    selectedCategory: number,
    category_id: string,
    index: number
) => {
    try {
        const { error: deleteTempError } = await supabase
            .from('templates')
            .delete()
            .match({ category_id });

        const { error: deleteCatError } = await supabase
            .from('categories')
            .delete()
            .eq("category_id", category_id)
            .match({ user_id: userID })
        if (deleteTempError) {
            console.log("deleteTempError", deleteTempError)
        } else if (deleteCatError) {
            console.log("deleteCatError", deleteCatError)
        } else {
            const updatedCategories = textTemplates.filter((_, i) => i !== index);
            setTextTemplates(updatedCategories);
            if (index === selectedCategory) {
                setSelectedCategory(updatedCategories.length > 0 ? 0 : -1);
            }
        }
    } catch (error) {
        console.error("Failed to create template:", error);
    }
}


