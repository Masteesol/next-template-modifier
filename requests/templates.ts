
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()
import { v4 as uuidv4 } from 'uuid';

export const updateCategory = async (newCatTitle: string, category_id: string, userID: string, order = null) => {
    try {
        let updateObject: { category_name: string; order?: number } = { category_name: newCatTitle };
        if (order !== null) {
            updateObject.order = order;
        }
        const { data, error } = await supabase
            .from("categories")
            .update(updateObject)
            .eq("category_id", category_id)
            .match({ user_id: userID })
            .select();
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

export const updateCategoryOrder = async (category_id: string, userID: string, order: number) => {
    try {
        const { data, error } = await supabase
            .from("categories")
            .update({ order: order })
            .eq("category_id", category_id)
            .match({ user_id: userID })
            .select();
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

export const updateTemplateMetaData = async (template_id: string, userID: string, copy_count: number, word_limit: number, char_limit: number) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({
                copy_count: copy_count,
                word_limit: word_limit,
                char_limit: char_limit
            })
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

export const fetchTemplatesForUser = async (userId: string | undefined | null, setIsLoading: any) => {
    if (!userId) {
        return Promise.resolve(null); // or some other default value
    }
    //console.log("userId", userId)
    try {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('categories')
            .select(`
            category_id,
            category_name,
            order,
            templates (template_id, title, text, copy_count, word_limit, char_limit)
          `)
            .eq('user_id', userId)

        if (error) {
            console.log("Fetch templates error", error)
            setIsLoading(false)
        }
        setIsLoading(false)
        return data;
    } catch (error) {
        console.log("error", error)
    }
};

export const fetchOnlyTemplatesForUser = async (userId: string | undefined | null, setIsLoading: any) => {
    if (!userId) {
        return Promise.resolve(null); // or some other default value
    }
    //console.log("userId", userId)
    try {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('templates')
            .select(`
            template_id,
            text,
            copy_count,
            category_id
          `)
            .eq('user_id', userId)


        if (error) {
            console.log("Fetch templates error", error)
            setIsLoading(false)
        }
        setIsLoading(false)
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
    order: number;
    templates: Templates[];
}

export const createCategory = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    setSelectedCategory: React.Dispatch<React.SetStateAction<number>>
) => {
    try {
        const order = textTemplates.length
        const { data, error } = await supabase
            .from('categories')
            .insert([{
                category_name: "New Category",
                user_id: userID,
                order: order
            }])
            .select()
        if (data) {
            const newCategory = data[0]
            console.log(newCategory)
            const { category_id, category_name } = newCategory

            const newCategoryWithTemplates: TemplatesContainer = {
                category_id: category_id,
                category_name: category_name,
                order: order,
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

            // Update the order property for each remaining category
            updatedCategories.forEach((category, idx) => {
                category.order = idx;
            });

            setTextTemplates(updatedCategories);

            // Update the order for each category in the database
            const updatePromises = updatedCategories.map((item: TemplatesContainer) =>
                updateCategoryOrder(item.category_id, userID, item.order)
            );
            await Promise.all(updatePromises);

            if (index === selectedCategory) {
                setSelectedCategory(updatedCategories.length > 0 ? 0 : -1);
            }
        }
    } catch (error) {
        console.error("Failed to delete category:", error);
    }
}
