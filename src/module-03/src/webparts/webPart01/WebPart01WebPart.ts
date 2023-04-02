import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables
} from '@microsoft/sp-dynamic-data';

import * as strings from 'WebPart01WebPartStrings';
import WebPart01 from './components/WebPart01';
import { IWebPart01Props } from './components/IWebPart01Props';

export interface IEvent {
  value: string;
}

export interface IWebPart01WebPartProps {
  description: string;
}

export default class WebPart01WebPart extends BaseClientSideWebPart<IWebPart01WebPartProps> implements IDynamicDataCallables {
  /**
   * Currently selected event
   */
  private _selectedEvent: IEvent;

  public render(): void {
    const element: React.ReactElement<IWebPart01Props> = React.createElement(
      WebPart01,
      {
        onEventSelected: this._eventSelected
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Return list of dynamic data properties that this dynamic data source
   * returns
   */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      { id: 'event', title: 'Event' }
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): IEvent {
    switch (propertyId) {
      case 'event':
        return this._selectedEvent;
    }

    throw new Error('Bad property id');
  }

  protected onInit(): Promise<void> {
    // register this web part as dynamic data source
    this.context.dynamicDataSourceManager.initializeSource(this);
    
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _eventSelected = (event: IEvent): void => {
    // store the currently selected event in the class variable. Required
    // so that connected component will be able to retrieve its value
    this._selectedEvent = event;
    // notify subscribers that the selected event has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('event');
  }
}
