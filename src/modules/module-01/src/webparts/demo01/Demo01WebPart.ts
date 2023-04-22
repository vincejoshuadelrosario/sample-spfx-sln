import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './Demo01WebPart.module.scss';

export interface IDemo01WebPartProps {
}

export default class Demo01WebPart extends BaseClientSideWebPart<IDemo01WebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.demo01 }"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
