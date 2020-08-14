import("@material/mwc-drawer/mwc-drawer.js");
import { XtalElement, define, AttributeProps } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import('xtal-fetch/xtal-fetch-req.js');
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import { TransformValueOptions } from 'trans-render/types.d.js';
import('./swag-tag-mwc');
const mainTemplate = createTemplate(/* html */`
    <mwc-drawer hasheader type="modal" open>
        <span slot="title">Drawer Title</span>
        <span slot="subtitle">subtitle</span>
        <div class="drawer-content">
            <p>Drawer content</p>
            <mwc-icon-button icon="gesture"></mwc-icon-button>
            <mwc-icon-button icon="gavel" id="gavel"></mwc-icon-button>
        </div>
        <div slot="appContent">
            <mwc-top-app-bar>
                <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
                <div slot="title">Title</div>
                <mwc-icon-button slot="actionItems" icon="cast"></mwc-icon-button>
                <mwc-icon-button slot="actionItems" icon="fingerprint"></mwc-icon-button>
            </mwc-top-app-bar>
            <div class="main-content">
                <xtal-fetch-req fetch -href as=text part=fetch insert-results></xtal-fetch-req>
            </div>
        </div>
    </mwc-drawer>
`);
const uiRefs = {fetch: Symbol('fetch')};
const initTransform = {
    ':host': [templStampSym, uiRefs],
} as TransformValueOptions;

const bindFetch = ({href}: SwagTagCatalogMWC) =>({
    [uiRefs.fetch]: [{href: href}],
});
const updateTransforms = [
    bindFetch,
]
const propActions = [
    bindFetch,
];

export class SwagTagCatalogMWC extends XtalElement {
    static is = 'swag-tag-catalog-mwc';
    static attributeProps = ({href}: SwagTagCatalogMWC) => ({
        str:[href],
    } as AttributeProps);
    readyToInit = true;
    readyToRender = true;
    mainTemplate = mainTemplate;
    initTransform = initTransform;
    updateTransforms = updateTransforms;
    href: string | undefined;
    propActions = propActions;
}

define(SwagTagCatalogMWC);

