import * as React from 'react';
import { useSPHttpService } from './useSPHttpService';

export const useSPPost = (setState: React.Dispatch<React.SetStateAction<[string, boolean, Error]>>): [ (url: string, options: { headers: {}, body: string }) => AbortController ] => {

    const spHttpService = useSPHttpService();

    const spPost = (url: string, options: { headers: {}, body: string }): AbortController => {
        const abortController = new AbortController();
        setState(['', true, undefined]);
        spHttpService.post(url, { headers: options.headers, body: options.body, signal: abortController.signal })
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

    return [ spPost ];
}
