import * as React from 'react';
import { useSPHttpService } from './useSPHttpService';

export const useSPGet = (setState: React.Dispatch<React.SetStateAction<[string, boolean, Error]>>): [ (url: string, options: { headers: {} }) => AbortController ] => {

    const spHttpService = useSPHttpService();

    const spGet = (url: string, options: { headers: {} }): AbortController => {
        const abortController = new AbortController();
        setState(['', true, undefined]);
        spHttpService.get(url, { headers: options.headers, signal: abortController.signal })
            .then((res) => {
                setState([JSON.stringify(res, null, '\t'), false, undefined]);
            })
            .catch(err => {
                if (!abortController.signal.aborted) {
                    setState(['', false, err]);
                }
                setState(['', false, undefined]);
            });
        
        return abortController;
    };

    return [ spGet ];
}
