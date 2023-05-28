// templates.ts

import * as Template1 from './BannerTemplates/Template1';
import * as Template2 from './BannerTemplates/Template2'

interface TemplatesMap {
  [key: string]: typeof Template1;
}

const templatesMap: TemplatesMap = {
  "1": Template1,
  "2": Template2
};

export default templatesMap;
