import {SwagTagPrimitiveBase} from 'swag-tag/lib/swag-tag-primitive-base.js';
import {define, AttributeProps, mergeProps, RenderContext, SelectiveUpdate} from 'xtal-element/XtalElement.js';
import {createTemplate} from 'trans-render/createTemplate.js';
import {conditionalImport} from 'xtal-sip/conditionalImport.js';
// import("@material/mwc-select/mwc-select.js");
// import("@material/mwc-list/mwc-list-item.js");

const mainTemplate = createTemplate(/* html */`
  <style>
      :host{
          display:block;
      }
      label{
          display:block;
      }
      mwc-select{
          width: 100%;
      }
  </style>
  <mwc-select part=select></mwc-select>
`);

const optionTemplate = createTemplate(/* html */`
<mwc-list-item></mwc-list-item>
`);

const [mwcSel] = [Symbol()];

const initTransform = ({self}: SwagTagMWCSelect) => ({
    'mwc-select': [{},{selected:self.handleSelected},{label: name},,mwcSel]
});
const updateSelect = ({readOnly, inputType, disabled, value, name}: SwagTagMWCSelect) =>({
    [mwcSel]: [{},,{'readonly': readOnly, disabled: disabled, value: value, label: name}]
});
const updateOptions = ({self, options}: SwagTagMWCSelect) => ({
    [mwcSel]: [options || [], optionTemplate,,{
        'mwc-list-item': ({item}: RenderContext) => [{textContent: item,value: item}]
    }]
});

export class SwagTagMWCSelect extends SwagTagPrimitiveBase{
    static is = 'swag-tag-mwc-select';
    static attributeProps = ({options}: SwagTagMWCSelect) =>{
        const ap = {
            obj:[options]
        } as AttributeProps;
        return mergeProps(ap, SwagTagPrimitiveBase.props);
    }
    mainTemplate = mainTemplate;
    initTransform = initTransform;
    updateTransforms = [updateOptions, updateSelect] as SelectiveUpdate<any>[];
    handleSelected(e: CustomEvent){
        this.editedValue = (<any>e.target!).value;
    }
    options: string[] | undefined;
    _didImport = false;
    get root(): HTMLElement | ShadowRoot{
        const s = super.root;
        if(this._didImport) return s;
        this._didImport = true;
        conditionalImport(this.shadowRoot!,{
            'mwc-{select|list-item}':[
                [
                    ({localName}) => `@material/${localName!.replace('-item','')}/${localName}.js`, 
                    [() => import("@material/mwc-select/mwc-select.js"), () => import("@material/mwc-list/mwc-list-item.js")],
                    ({localName}) => `//unpkg.com/@material/${localName}/${localName}.js?module`
                ]
            ]
        });
        return s;
    }

}
define(SwagTagMWCSelect);