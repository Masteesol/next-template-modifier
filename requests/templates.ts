
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()
import { v4 as uuidv4 } from 'uuid';
import { TemplatesContainer } from "@/types/global"


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
            favourited,
            templates (
              template_id, 
              title, 
              text, 
              copy_count, 
              word_limit, 
              char_limit, 
              limiter_active, 
              order, 
              favourited,
              is_collection,
              template_collections (text, id, order)
            )
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

export const updateTemplatesOrder = async (category_id: string, template_id: string, userID: string, order: number) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({ order: order })
            .eq("template_id", template_id)
            .match({ user_id: userID, category_id: category_id })
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



export const updateTemplate = async (
    newTitle: string,
    newText: string,
    userID: string,
    template_id: string,
    char_limit: number | null,
    word_limit: number | null,
    limiter_active: boolean

) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({
                title: newTitle,
                text: newText,
                char_limit: char_limit,
                word_limit: word_limit,
                limiter_active: limiter_active
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

export const updateTemplateTitle = async (
    newTitle: string,
    userID: string,
    template_id: string,

) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({
                title: newTitle,
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


export const updateTemplateMetaData = async (template_id: string, userID: string, copy_count: number) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({
                copy_count: copy_count
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

export const updateCategoryFavourite = async (category_id: string, userID: string, favourited: boolean) => {
    try {
        const { data, error } = await supabase
            .from("categories")
            .update({ favourited: favourited })
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

export const updateTemplatesFavourite = async (template_id: string, userID: string, favourited: boolean) => {
    try {
        const { data, error } = await supabase
            .from("templates")
            .update({ favourited: favourited })
            .eq("template_id", template_id)
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

export const updateTemplateCollectionItem = async (template_id: string, collectionItemID: string, text: string, order: number) => {
    try {
        const { data, error } = await supabase
            .from("template_collections")
            .update({
                text: text,
                order: order
            })
            .eq("id", collectionItemID)
            .match({ template_id: template_id })
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

export const updateTemplatesCollectionOrder = async (collectionItemID: string, template_id: string, order: number) => {
    try {
        const { data, error } = await supabase
            .from("template_collections")
            .update({ order: order })
            .eq("id", collectionItemID)
            .match({ template_id: template_id })
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


export const createTemplateCollectionItem = async (template_id: string, id: string) => {
    try {
        const { data, error } = await supabase
            .from("template_collections")
            .insert([{
                id: id,
                text: "",
                order: 0,
                template_id: template_id
            }])
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

export const removeTemplateCollectionItem = async (id: string) => {
    try {
        const { data, error } = await supabase
            .from("template_collections")
            .delete()
            .eq("id", id)
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
                favourited: false,
                templates: []
            }
            const updatedTextTemplates = [...textTemplates, newCategoryWithTemplates];
            console.log("Create category - updatedTextTemplates", updatedTextTemplates)
            setTextTemplates(updatedTextTemplates);
            setSelectedCategory(updatedTextTemplates && updatedTextTemplates.length - 1 | 0);
        } else {
            console.log("Error creating category", error)
        }

    } catch (error) {
        console.error("Failed to create category:", error);
    }
}

interface TemplateData {
    template_id: string,
    title: string,
    text: string,
    category_id: string,
    user_id: string,
    is_collection: boolean,
    order: number
}


export const createTemplate = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    selectedCategory: number,
    is_collection: boolean
) => {
    const newID = uuidv4()

    const dataObject: TemplateData = {
        template_id: newID,
        title: `${is_collection ? "New Template Collection" : "New Template"}`,
        text: `${is_collection ? "Text Placeholder" : "Template text..."}`,
        category_id: textTemplates[selectedCategory].category_id,
        user_id: userID,
        is_collection: is_collection,
        order: textTemplates[selectedCategory].templates.length
    }
    try {
        const { data, error } = await supabase
            .from('templates')
            .insert([
                dataObject
            ])
            .select()
        console.log(data)
        if (error) {
            console.log("Error creating template", error)
        }
        if (data) {
            const newTemplate = data[0];
            if (is_collection) {
                newTemplate.template_collections = []
            }
            const updatedTemplates = [...textTemplates[selectedCategory].templates, newTemplate];
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
            console.log("New text templates created", updatedTextTemplates[selectedCategory])
        }



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

export const deleteCollectionTemplate = async (
    userID: string,
    textTemplates: TemplatesContainer[],
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>,
    selectedCategory: number,
    template_id: string,
    index: number
) => {
    try {
        const { error: deleteCollectionpError } = await supabase
            .from('template_collections')
            .delete()
            .match({ template_id });

        const { error } = await supabase
            .from('templates')
            .delete()
            .eq("template_id", template_id)
            .match({ user_id: userID })
        if (deleteCollectionpError) {
            console.log("Error deleting collection", deleteCollectionpError)
        }
        else if (error) {
            console.log("Error deleting template")
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
            console.log("Delete category updated list:", updatedCategories)
            setTextTemplates(updatedCategories);

            // Update the order for each category in the database
            const updatePromises = updatedCategories.map((item: TemplatesContainer) =>
                updateCategoryOrder(item.category_id, userID, item.order)
            );
            await Promise.all(updatePromises);

            if (index === selectedCategory) {
                setSelectedCategory(0);
            }
        }
    } catch (error) {
        console.error("Failed to delete category:", error);
    }
}
