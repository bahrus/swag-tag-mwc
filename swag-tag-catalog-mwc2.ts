import { XtalElement, define, AttributeProps, TransformGetter, SelectiveUpdate, RenderContext, symbolize, p, TransformValueOptions } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
export const mainTemplate = createTemplate(/* html */`

`);
const initTransform = ({}: SwagTagCatalogMWC) => ({
   
} as TransformValueOptions);
export class SwagTagCatalogMWC extends XtalElement {
    static is = 'swag-tag-catalog-mwc';

    mainTemplate = mainTemplate;
    readyToInit = true;
    initTransform = initTransform;
    readyToRender = true;
}
define(SwagTagCatalogMWC);