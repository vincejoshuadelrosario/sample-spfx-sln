import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables
} from '@microsoft/sp-dynamic-data';

import WebPart01 from './components/WebPart01';
import { IWebPart01Props } from './components/IWebPart01Props';

export interface IWebPart01WebPartProps {
  description: string;
}

export default class WebPart01WebPart extends BaseClientSideWebPart<IWebPart01WebPartProps> implements IDynamicDataCallables {
  /**
   * Currently selected Dynamic Data
   */
  private _selectedDynamicData: string;

  public render(): void {
    const element: React.ReactElement<IWebPart01Props> = React.createElement(
      WebPart01,
      {
        onDynamicDataSelected: this._dynamicDataSelected
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
      { id: 'dynamicData', title: 'Dynamic Data' }
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): string {
    switch (propertyId) {
      case 'dynamicData':
        return this._selectedDynamicData;
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
    return super.getPropertyPaneConfiguration();
  }

  private _dynamicDataSelected = (dynamicData: string): void => {
    // store the currently selected dynamic data in the class variable. Required
    // so that connected component will be able to retrieve its value
    this._selectedDynamicData = dynamicData;
    // notify subscribers that the selected dynamic data has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('dynamicData');
  }
}
