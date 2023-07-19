export interface Templates {
    title: string;
    text: string;
    template_id: string;
    char_limit: number | null;
    copy_count: number;
    word_limit: number | null;
    limiter_active: boolean;
    order: number;
    favourited: boolean
}

export interface TemplatesContainer {
    category_id: string;
    category_name: string;
    order: number;
    favourited: boolean;
    templates: Templates[];
}
