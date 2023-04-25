import * as React from 'react';
import { AppContext } from '../contexts/appContext';
import { ISPHttpService, SPHttpService } from '../services/spHttpService';

export const useSPHttpService = (): ISPHttpService => {
    const { serviceScope } = React.useContext(AppContext);
    return serviceScope.consume<ISPHttpService>(SPHttpService.serviceKey)
}
