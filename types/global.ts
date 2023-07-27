export interface CollectionItem {
    text: string;
    id: string;
    order: number;
}

export interface Templates {
    title: string;
    text: string;
    template_id: string;
    char_limit: number | null;
    copy_count: number;
    word_limit: number | null;
    limiter_active: boolean;
    order: number;
    favourited: boolean;
    is_collection: boolean;
    template_collections: CollectionItem[]
}

export interface TemplatesContainer {
    category_id: string;
    category_name: string;
    order: number;
    favourited: boolean;
    templates: Templates[];
}

export interface TemplateModified {
    title: string;
    template_id: string;
    copy_count: number;
    category_name: string;
    char_limit: number | null
    text: string;
    word_limit: number;
    favourited: boolean;
    category_id: string;
}