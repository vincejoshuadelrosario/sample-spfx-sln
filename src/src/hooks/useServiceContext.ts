import { useContext } from 'react';
import { IServiceContext } from '../common/IServiceContext';
import { ServiceContext } from '../common/ServiceContext';

export const useServiceContext = (): IServiceContext => useContext(ServiceContext);