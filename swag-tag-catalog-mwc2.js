import { XtalElement, define, symbolize, p } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { preemptiveImport } from 'xtal-sip/preemptiveImport.js';
import { conditionalImport } from 'xtal-sip/conditionalImport.js';
import { templStampSym } from 'trans-render/plugins/templStamp.js';
preemptiveImport(['RobotoFont', , '//fonts.googleapis.com/css?family=Roboto:300,400,500', , { cssScope: 'global' }]);
preemptiveImport(['MaterialIconsFont', , 'https://fonts.googleapis.com/css?family=Material+Icons&amp;display=block', , { cssScope: 'global' }]);
export const mainTemplate = createTemplate(/* html */ `
    <style>
        ::slotted(iframe){
            height: 100%;
            width: 100%;
        }
        ::slotted(nav){
            display: flex;
            flex-direction: column;
        }
        :host{
            display:flex;
            height: 100%;
            width: 100%;
        }
         
        .appContent {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            overflow: hidden; /* TODO, alternative */
        }
        mwc-drawer{
            width: 100%;
        }
        .main-content {
            flex-grow:100;
        }
        .drawer-content {
            margin-left: 15px;
        }
        .top--icon {
            color: white;
        }
    </style>

    <mwc-drawer hasheader type="modal" open part=drawer>
     
    <span slot="title">Catalog</span>
    <span slot="subtitle">components</span>
    <div class="drawer-content" part=drawerContent>
        <p>Demos</p>
        <div part=mwcButtonContainer>
            <slot name=linkList></slot>
        </div>
        <!-- <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of=iframe[-src] val=target.dataset.href></p-d>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of=[-text-content] val=target.title></p-d>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of='[icon="code"][-data-href]' val=target.dataset.code as-attr></p-d>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of='[icon="info"][-data-href]' val=target.dataset.info as-attr></p-d> -->
    </div>
    <div slot=appContent part=appContent class=appContent>
        <mwc-top-app-bar>
            <mwc-icon-button slot="navigationIcon" icon="menu" part=navigationIcon data-msg1=true></mwc-icon-button>
            <p-u on=click to-closest=mwc-drawer val=target.dataset.msg1 prop=open parse-value-as=bool></p-u>
            <p-h-d to=[-text-content] m=1 id=titlePass></p-h-d>
            <div slot="title" -text-content>Title</div>
            <p-h-d to=[-href] m=1 id=codePass></p-h-d>
            <a -href target=_blank slot="actionItems">
                <mwc-icon title="Code Repository" class=top--icon>code</mwc-icon>
            </a>
            <p-h-d to=[-href] m=1 id=docPass></p-h-d>
            <a -href target=_blank slot="actionItems">
                <mwc-icon title="Documentation" class=top--icon>info</mwc-icon>
            </a>
        </mwc-top-app-bar>
        <div class="main-content">
            <slot name=iframe></slot>
        </div>
    </div>
    
</mwc-drawer> 
`);
const refs = { titlePass: p, codePass: p, docPass: p };
symbolize(refs);
const initTransform = ({}) => ({
    ':host': [templStampSym, refs]
});
const bindTitle = ({ statePathForTitle, statePathForCode, statePathForDoc }) => ({
    [refs.titlePass]: [{ fromPath: statePathForTitle }],
    [refs.codePass]: [{ fromPath: statePathForCode }],
    [refs.docPass]: [{ fromPath: statePathForDoc }]
});
const updateTransforms = [
    bindTitle
];
export class SwagTagCatalogMWC extends XtalElement {
    constructor() {
        super(...arguments);
        this.mainTemplate = mainTemplate;
        this.readyToInit = true;
        this.initTransform = initTransform;
        this.updateTransforms = updateTransforms;
        this.readyToRender = true;
    }
    get root() {
        const r = super.root;
        conditionalImport(r, {
            'mwc-{top-app-bar|icon-button|drawer|icon}': [
                [
                    ({ localName }) => `@material/${localName}/${localName}.js`,
                    [
                        () => import('@material/mwc-top-app-bar/mwc-top-app-bar.js'),
                        () => import('@material/mwc-icon-button/mwc-icon-button.js'),
                        () => import('@material/mwc-drawer/mwc-drawer.js'),
                        () => import('@material/mwc-icon/mwc-icon.js')
                    ],
                    ({ localName }) => `//unpkg.com/@material/${localName}/${localName}.js?module`
                ]
            ],
            'p-{d|u|h-d}': [
                [
                    ({ localName }) => `p-et-alia/${localName}.js`,
                    [() => import('p-et-alia/p-d.js'), () => import('p-et-alia/p-u.js'), () => import('p-et-alia/p-h-d.js')],
                    ({ localName }) => `//unpkg.com/p-et-alia/${localName}.js?module`
                ]
            ]
        });
        return r;
    }
}
SwagTagCatalogMWC.is = 'swag-tag-catalog-mwc';
SwagTagCatalogMWC.attributeProps = ({ statePathForTitle, statePathForCode, statePathForDoc }) => ({
    str: [statePathForTitle, statePathForCode, statePathForDoc]
});
define(SwagTagCatalogMWC);
