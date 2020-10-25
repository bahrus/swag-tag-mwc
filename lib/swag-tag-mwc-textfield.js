import { SwagTagPrimitiveBase } from 'swag-tag/lib/swag-tag-primitive-base.js';
import { define } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { conditionalImport } from 'xtal-sip/conditionalImport.js';
const mainTemplate = createTemplate(/* html */ `
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
const initTransform = ({ self }) => ({
    'mwc-textfield': [{}, { input: self.handleInput }, , , mwcTxtFld]
});
const updateInput = ({ readOnly, inputType, disabled, value, name, description }) => ({
    [mwcTxtFld]: [{ readOnly: readOnly, type: inputType, disabled: disabled, value: value, label: name, helper: description }]
});
const updateTransforms = [
    updateInput
];
export const linkInputType = ({ type, self }) => {
    switch (type) {
        case 'number':
            self.inputType = 'number';
            break;
        case 'string':
            self.inputType = 'text';
            break;
    }
};
export const linkEditedValue = ({ value, self }) => {
    self.editedValue = value;
};
const propActions = [
    linkInputType, linkEditedValue
];
export class SwagTagMWCTextField extends SwagTagPrimitiveBase {
    constructor() {
        super(...arguments);
        this.mainTemplate = mainTemplate;
        this.initTransform = initTransform;
        this.updateTransforms = updateTransforms;
        this.propActions = propActions;
        this._didImport = false;
    }
    afterUpdateRenderCallback() {
        if (this._didImport)
            return;
        this._didImport = true;
        conditionalImport(this.shadowRoot, {
            'mwc-{check-box|formfield}': [
                [
                    ({ localName }) => `@material/${localName}/${localName}.js`,
                    [() => import("@material/mwc-checkbox/mwc-checkbox.js"), () => import("@material/mwc-formfield/mwc-formfield.js")],
                    ({ localName }) => `//unpkg.com/@material/${localName}/${localName}.js?module`
                ]
            ]
        });
    }
}
SwagTagMWCTextField.is = 'swag-tag-mwc-textfield';
define(SwagTagMWCTextField);
