import { XtalElement, define } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { preemptiveImport } from 'xtal-sip/preemptiveImport.js';
import { conditionalImport } from 'xtal-sip/conditionalImport.js';
preemptiveImport(['RobotoFont', , '//fonts.googleapis.com/css?family=Roboto:300,400,500', , { cssScope: 'global' }]);
preemptiveImport(['MaterialIconsFont', , 'https://fonts.googleapis.com/css?family=Material+Icons&amp;display=block', , { cssScope: 'global' }]);
export const mainTemplate = createTemplate(/* html */ `
    <style>
        ::slotted(iframe){
            height: 100%;
            width: 100%;
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
            background-color: yellow;
            overflow: hidden; /* TODO, alternative */
        }
        mwc-drawer{
            width: 100%;
        }
        .main-content {
            flex-grow:100;
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
            <div slot="title" -text-content>Title</div>
            <mwc-icon-button slot="actionItems" icon="code" title="Code Repository" role=link part=codeLink -data-href></mwc-icon-button>
            <mwc-icon-button slot="actionItems" icon="info" title="Documentation" role=link part=documentationLink -data-href></mwc-icon-button>
        </mwc-top-app-bar>
        <div class="main-content">
            <slot name=iframe></slot>
        </div>
    </div>
    
</mwc-drawer>
    
    
`);
const initTransform = ({}) => ({});
export class SwagTagCatalogMWC extends XtalElement {
    constructor() {
        super(...arguments);
        this.mainTemplate = mainTemplate;
        this.readyToInit = true;
        this.initTransform = initTransform;
        this.readyToRender = true;
    }
    get root() {
        const r = super.root;
        conditionalImport(r, {
            'mwc-{top-app-bar|icon-button|drawer}': [
                [
                    ({ localName }) => `@material/${localName}/${localName}.js`,
                    [() => import('@material/mwc-top-app-bar/mwc-top-app-bar.js'), () => import('@material/mwc-icon-button/mwc-icon-button.js'), () => import('@material/mwc-drawer/mwc-drawer.js')],
                    ({ localName }) => `//unpkg.com/@material/${localName}/${localName}.js?module`
                ]
            ],
            'p-{d|u}': [
                [
                    ({ localName }) => `p-et-alia/${localName}.js`,
                    [() => import('p-et-alia/p-d.js'), () => import('p-et-alia/p-u.js')],
                    ({ localName }) => `//unpkg.com/p-et-alia/${localName}.js?module`
                ]
            ]
        });
        return r;
    }
}
SwagTagCatalogMWC.is = 'swag-tag-catalog-mwc';
define(SwagTagCatalogMWC);
