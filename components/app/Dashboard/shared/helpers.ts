import { TemplateModified } from "@/types/global"

export class TemplateChecker {
    private textTemplates: TemplateModified[];
    private isCollection: boolean;

    constructor(textTemplates: TemplateModified[], isCollection: boolean) {
        this.textTemplates = textTemplates;
        this.isCollection = isCollection;
    }

    get result(): TemplateModified[] {
        if (this.isCollection) {
            return this.textTemplates.filter(item => item.is_collection);
        } else {
            return this.textTemplates.filter(item => !item.is_collection);
        }
    }

    get length(): number {
        return this.result.length;
    }
}
