import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { DynamicProperty } from '@microsoft/sp-component-base';
import {
  DynamicDataSharedDepth,
  IPropertyPaneConfiguration,
  PropertyPaneDynamicField,
  PropertyPaneDynamicFieldSet,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WebPart02WebPartStrings';
import WebPart02 from './components/WebPart02';
import { IWebPart02Props } from './components/IWebPart02Props';

export interface IWebPart02WebPartProps {
  dynamicData: DynamicProperty<string>;
}

export default class WebPart02WebPart extends BaseClientSideWebPart<IWebPart02WebPartProps> {
  
  public render(): void {
    const element: React.ReactElement<IWebPart02Props> = React.createElement(
      WebPart02,
      {
        output: this.properties.dynamicData?.tryGetValue()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Use Property Pane to configure your Dynamic Data source'
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: 'Select Dynamic Data source',
                  fields: [
                    PropertyPaneDynamicField('dynamicData', {
                      label: 'Dynamic Data source'
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Property
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
