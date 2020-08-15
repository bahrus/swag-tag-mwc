
import { XtalElement, define, AttributeProps, TransformGetter, SelectiveUpdate, RenderContext, symbolize, p } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import('xtal-fetch/xtal-fetch-req.js');
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import { TransformValueOptions } from 'trans-render/types.d.js';
import('./swag-tag-mwc.js');
import('@material/mwc-top-app-bar/mwc-top-app-bar.js');
import('@material/mwc-icon-button/mwc-icon-button.js');
import('@material/mwc-drawer/mwc-drawer.js');
import('p-et-alia/p-d.js');
import('p-et-alia/p-u.js');

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

    [part="demoWindow"]{
        height:calc(100vh - 150px);
        width:100%;
    }

    [part=mwcButtonContainer][disabled]{
        visibility: hidden;
    }

</style>
<slot name=linkList part=linksSlot style=display:none></slot>
<mwc-drawer hasheader type="modal" open part=drawer>
    <span slot="title">Catalog</span>
    <span slot="subtitle">components</span>
    <div class="drawer-content" part=drawerContent>
        <p>Demos</p>
        <div part=mwcButtonContainer disabled=4></div>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of=iframe[-src] val=target.dataset.href></p-d>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of=[-text-content] val=target.title></p-d>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of='[icon="code"][-data-href]' val=target.dataset.code as-attr></p-d>
        <p-d on=click from="[part='drawerContent']" to="[part='appContent']" care-of='[icon="info"][-data-href]' val=target.dataset.info as-attr></p-d>
    </div>
    <div slot="appContent" part=appContent>
        <mwc-top-app-bar>
            <mwc-icon-button slot="navigationIcon" icon="menu" part=navigationIcon data-msg1=true></mwc-icon-button>
            <p-u on=click to-closest=mwc-drawer val=target.dataset.msg1 prop=open parse-value-as=bool></p-u>
            <div slot="title" -text-content>Title</div>
            <mwc-icon-button slot="actionItems" icon="code" title="Code Repository" role=link part=codeLink -data-href></mwc-icon-button>
            <mwc-icon-button slot="actionItems" icon="info" title="Documentation" role=link part=documentationLink -data-href></mwc-icon-button>
        </mwc-top-app-bar>
        <div class="main-content">
            <iframe -src part=demoWindow></iframe>
        </div>
    </div>
    
</mwc-drawer>
    
`);
const uiRefs = { fetch: p, linksSlot: p, mwcButtonContainer: p, appContent: p, drawer: p, navigationIcon: p, codeLink: p, documentationLink: p };
symbolize(uiRefs);
const initTransform = ({ onLinksSlotChange, onLinkButtonClick }: SwagTagCatalogMWC) => ({
    ':host': [templStampSym, uiRefs],
    [uiRefs.linksSlot]: [{}, { slotchange: onLinksSlotChange }],
    [uiRefs.codeLink]: [{}, {click:[onLinkButtonClick, 'dataset.href']}],
    [uiRefs.documentationLink]: [{}, {click:[onLinkButtonClick, 'dataset.href']}],
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
const propActions = [
    linkLinks,
];
const drawerButton = createTemplate(/* html */`
<div part=buttonContainer>
    <mwc-icon-button icon="device_hub"></mwc-icon-button><span></span>
</div>
`);
const bindLinks = ({links}: SwagTagCatalogMWC) =>({
    [uiRefs.mwcButtonContainer]: [links, drawerButton,,{
        div: ({item}: RenderContext<SwagTagCatalogMWC, HTMLAnchorElement>) => ({
            'mwc-icon-button': [{
                title:item!.textContent, 
                dataset:{
                    href:item!.href,
                    code:item!.dataset.code, 
                    info:item!.dataset.info
                }
            }],
            'span': [{textContent:item!.textContent}],
        }) 
    }],
});
const updateTransforms = [
    bindLinks,
] as SelectiveUpdate<any>[];




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
        this.linkAssignedNodes = (<any>this)[uiRefs.linksSlot].assignedNodes();
    }
    onLinkButtonClick(href: string){
        window.open(href, '_blank');
    }
}

define(SwagTagCatalogMWC);

