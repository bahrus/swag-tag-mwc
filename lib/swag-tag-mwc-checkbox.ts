import {SwagTagPrimitiveBase} from 'swag-tag/lib/swag-tag-primitive-base.js';
import {SelectiveUpdate} from 'xtal-element/types.d.js';
import {define} from 'xtal-element/XtalElement.js';
import {createTemplate} from 'trans-render/createTemplate.js';
import {conditionalImport} from 'xtal-sip/conditionalImport.js';


const mainTemplate = createTemplate(/* html */`
  <style>
      :host{
          display:block;
      }
      label{
          display:block;
      }
      mwc-formfield{
          width:100%;
      }
  </style>
  <mwc-formfield>
    <mwc-checkbox></mwc-checkbox>
  </mwc-formfield>
`);

const [ff, cb] = [Symbol('ff'), Symbol('cb')];

const initTransform = ({self}: SwagTagMWCCheckbox) => ({
    'mwc-formfield': ff,
    '"':{
        'mwc-checkbox': [{},{input:self.handleInput},,,cb]
    }
});

const updateInput = ({readOnly, inputType, disabled, value, name}: SwagTagMWCCheckbox) =>({
    [cb]: [{},,{'readonly': readOnly, type: inputType, disabled: disabled, value: value, label: name}]
});

const updateLabel = ({name}: SwagTagMWCCheckbox) =>({
    [ff]:[{label:name}]
});



export class SwagTagMWCCheckbox extends SwagTagPrimitiveBase{
    static is = 'swag-tag-mwc-checkbox';
    
    mainTemplate = mainTemplate;

    initTransform = initTransform;

    updateTransforms = [
        updateInput, updateLabel
    ]  as SelectiveUpdate<any>[];

    handleInput(e: Event){
        this.editedValue = !(<any>e.target!).checked;
    }

    propActions = [];
    _didImport = false;
    get root(): HTMLElement | ShadowRoot{
        const s = super.root;
        if(this._didImport) return s;
        this._didImport = true;
        conditionalImport(this.shadowRoot!,{
            'mwc-{textfield}':[
                [
                    ({localName}) => `@material/${localName}/${localName}.js`, 
                    [() => import("@material/mwc-checkbox/mwc-field.js")],
                    ({localName}) => `//unpkg.com/@material/${localName}/${localName}.js?module`
                ]
            ]
        });
        return s;
    }
}
define(SwagTagMWCCheckbox);