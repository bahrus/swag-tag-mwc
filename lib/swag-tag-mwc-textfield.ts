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
      mwc-textfield{
          width: 100%;
      }
  </style>
  <mwc-textfield part=textfield></mwc-textfield>
`);

const [mwcTxtFld] = [Symbol('txtFld')];

const initTransform = ({self}: SwagTagMWCTextField) => ({
    'mwc-textfield': [{},{input:self.handleInput},,,mwcTxtFld]
});

const updateInput = ({readOnly, inputType, disabled, value, name, description}: SwagTagMWCTextField) =>({
    [mwcTxtFld]: [{readOnly: readOnly, type: inputType, disabled: disabled, value: value, label: name, helper: description}]
});

const updateTransforms = [
    updateInput
]  as SelectiveUpdate<any>[];

export const linkInputType = ({type, self}: SwagTagMWCTextField) => {
    switch(type){
        case 'number':
            self.inputType = 'number';
            break;
        case 'string':
            self.inputType = 'text';
            break;
    }
}

export const linkEditedValue = ({value, self}: SwagTagMWCTextField) => {
    self.editedValue = value;
}

const propActions = [
    linkInputType, linkEditedValue
] as any;

export class SwagTagMWCTextField extends SwagTagPrimitiveBase{
    static is = 'swag-tag-mwc-textfield';
    
    mainTemplate = mainTemplate;

    initTransform = initTransform;

    updateTransforms = updateTransforms

    propActions = propActions;

    _didImport = false;
    afterUpdateRenderCallback(){
        if(this._didImport) return;
        this._didImport = true;
        conditionalImport(this.shadowRoot!,{
            'mwc-{check-box|formfield}':[
                [
                    ({localName}) => `@material/${localName}/${localName}.js`, 
                    [() => import("@material/mwc-checkbox/mwc-checkbox.js"), () => import("@material/mwc-formfield/mwc-formfield.js")],
                    ({localName}) => `//unpkg.com/@material/${localName}/${localName}.js?module`
                ]
            ]
        });
    }
}
define(SwagTagMWCTextField);