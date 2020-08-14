import("@material/mwc-drawer/mwc-drawer.js");
import { XtalElement, define, AttributeProps, TransformGetter, SelectiveUpdate, RenderContext } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import('xtal-fetch/xtal-fetch-req.js');
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import { TransformValueOptions } from 'trans-render/types.d.js';
import { SwagTag } from '../swag-tag/swag-tag';
import('./swag-tag-mwc');
import('@material/mwc-top-app-bar/mwc-top-app-bar.js');
import('@material/mwc-icon-button/mwc-icon-button.js');
import('p-et-alia/p-d.js');

const mainTemplate = createTemplate(/* html */`
    <style>
        :host {
            height: 100vh;
        }

        .drawer-content {
            padding: 0px 16px 0 16px;
        }

        .main-content {
            min-height: 300px;
            padding: 48px 18px 0 18px;
        }

        [inert] {
            pointer-events: none;
            cursor: default;
        }

        [inert],
        [inert] * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        :host {
  font-family: Roboto, sans-serif;
  margin: 0;
  transition: opacity ease-in 0.2s;
}

main {
  padding: 16px;
}

.demo-group, .demo-group-spaced {
  display: flex;
  align-items: center;
}

.wrap {
  flex-wrap: wrap;
}

.demo-group-spaced {
  justify-content: space-around;
}

.demo-group > *, .demo-group-spaced > * {
  margin: 0 8px;
}

div[part="mwcButtonContainer"] div {
    display:flex;
    flex-direction:row;
    align-items:center;
}

    </style>
    <slot name=linkList part=linksSlot style=display:none></slot>
    <mwc-drawer hasheader type="modal" open>
        <span slot="title">Catalog</span>
        <span slot="subtitle">components</span>
        <div class="drawer-content" part=drawerContent>
            <p>Demos</p>
            <div part=mwcButtonContainer></div>
            <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of=iframe[-src] val=target.dataset.href></p-d>
            <!-- <mwc-icon-button icon="device_hub" title="" data-href=></mwc-icon-button>
            <mwc-icon-button icon="gavel" id="gavel"></mwc-icon-button> -->
        </div>
        <div slot="appContent" part=appContent>
            <mwc-top-app-bar>
                <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
                <div slot="title">Title</div>
                <mwc-icon-button slot="actionItems" icon="cast"></mwc-icon-button>
                <mwc-icon-button slot="actionItems" icon="fingerprint"></mwc-icon-button>
            </mwc-top-app-bar>
            <div class="main-content">
                <iframe -src></iframe>
            </div>
        </div>
        
    </mwc-drawer>
    
`);
const uiRefs = { fetch: Symbol('fetch'), linksSlot: Symbol('linksSlot'), mwcButtonContainer: Symbol('mwcButtonContainer') };
const initTransform = ({ onLinksSlotChange }: SwagTagCatalogMWC) => ({
    ':host': [templStampSym, uiRefs],
    [uiRefs.linksSlot]: [{}, { slotchange: onLinksSlotChange }]
} as TransformValueOptions);

const linkLinks = ({ linkAssignedNodes, self }: SwagTagCatalogMWC) => {
    const links: HTMLAnchorElement[] = [];
    Array.from(linkAssignedNodes!).forEach(node => {
        if((<any>node).querySelectorAll) {
            Array.from((<Element>node).querySelectorAll('a')).forEach(a =>{
                links.push(a);
            })
        }
    });
    self.links = links;
}
const drawerButton = createTemplate(/* html */`
<div part=buttonContainer class=>
<mwc-icon-button icon="device_hub"></mwc-icon-button><span></span>
</div>
`);
const bindLinks = ({links}: SwagTagCatalogMWC) =>({
    [uiRefs.mwcButtonContainer]: [links, drawerButton,,{
        div: ({target, item}: RenderContext<SwagTagCatalogMWC, HTMLAnchorElement>) => ({
            'mwc-icon-button': [{dataset:{href:item!.href}}],
            'span': [{textContent:item!.textContent}],
        }) 
    }],
});
const updateTransforms = [
    bindLinks,
] as SelectiveUpdate<any>[];
const propActions = [
    linkLinks,
];



export class SwagTagCatalogMWC extends XtalElement {
    static is = 'swag-tag-catalog-mwc';
    static attributeProps = ({ linkAssignedNodes, links }: SwagTagCatalogMWC) => ({
        obj: [linkAssignedNodes, links],
    } as AttributeProps);
    readyToInit = true;
    readyToRender = true;
    mainTemplate = mainTemplate;
    initTransform = initTransform;
    updateTransforms = updateTransforms;
    links: HTMLAnchorElement[] | undefined;
    linkAssignedNodes: Node[] | undefined;
    propActions = propActions;
    onLinksSlotChange() {
        //setTimeout(() =>{
            this.linkAssignedNodes = (<any>this)[uiRefs.linksSlot].assignedNodes();
        //}, 1000);
        
    }
}

define(SwagTagCatalogMWC);

