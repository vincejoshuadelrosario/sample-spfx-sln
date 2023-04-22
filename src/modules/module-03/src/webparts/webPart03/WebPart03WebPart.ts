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

import * as strings from 'WebPart03WebPartStrings';
import WebPart03 from './components/WebPart03';
import { IWebPart03Props } from './components/IWebPart03Props';

export interface IWebPart03WebPartProps {
  dynamicData: DynamicProperty<string>;
  queryParameters: DynamicProperty<string>;
}

export default class WebPart03WebPart extends BaseClientSideWebPart<IWebPart03WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWebPart03Props> = React.createElement(
      WebPart03,
      {
        dynamicData: JSON.stringify(this.properties.dynamicData?.tryGetValue() || '', null, 2),
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
