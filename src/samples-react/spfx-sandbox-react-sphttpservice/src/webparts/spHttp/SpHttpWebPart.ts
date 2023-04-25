import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpHttpWebPartStrings';
import SpHttp from './components/SpHttp';
import { AppContext } from '../../contexts/appContext';

export interface ISpHttpWebPartProps {
  title: string;
}

export default class SpHttpWebPart extends BaseClientSideWebPart<ISpHttpWebPartProps> {

  public render(): void {
    const element: React.FunctionComponentElement<{}> = React.createElement(
      React.StrictMode,
      {},
      React.createElement(
        AppContext.Provider,
        {
          value: { serviceScope: this.context.serviceScope }
        },
        React.createElement(
        SpHttp,
        {
          title: this.properties.title,
          defaultUrl: this.context.pageContext.web.absoluteUrl
        })
      )
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
