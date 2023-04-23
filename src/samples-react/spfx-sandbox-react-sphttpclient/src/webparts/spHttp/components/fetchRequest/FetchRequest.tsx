import * as React from 'react';
import styles from './FetchRequest.module.scss';
import { IFetchRequestProps } from './IFetchRequestProps';
import { useSPGet, useSPPost } from '../../../../hooks';
import { ITextField, ITextFieldProps, TextField } from 'office-ui-fabric-react/lib/TextField';
import { BaseButton, Button, IButtonProps, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IDropdownProps, Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ISpinnerProps, Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean, useId } from '@fluentui/react-hooks';

export const FetchRequest: React.FC<IFetchRequestProps> = ({defaultUrl}) => {

    /* React Hooks */

    const [ {method, isRequestBodyDisabled}, setHttpMethod ] = React.useState<{method: string, isRequestBodyDisabled: boolean}>({method: 'get', isRequestBodyDisabled: true});
    const [ [response, isLoading, error], setFetchRequest ] = React.useState<[result: string, isLoading: boolean, error: Error]>(['', false, undefined]);
    const requestUrlTextField = React.useRef<ITextField>();
    const requestHeadersTextField = React.useRef<ITextField>();
    const requestBodyTextField = React.useRef<ITextField>();
    const abortController = React.useRef<AbortController>();

    /* Custom Hooks */

    const [ spGet ] = useSPGet(setFetchRequest);
    const [ spPost ] = useSPPost(setFetchRequest);
    
    /* Functions */

    const onMethodChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
        if (option.key === 'post') {
            setHttpMethod({method: 'post', isRequestBodyDisabled: false});
            return;
        }

        setHttpMethod({method: 'get', isRequestBodyDisabled: true});
    };

    const fetchRequest = (): void => {
        switch (method) {
            case 'post':
                abortController.current?.abort();
                abortController.current = spPost(requestUrlTextField.current.value, { headers: requestHeadersTextField.current.value, body: requestBodyTextField.current.value });
                break;
            case 'get':
                abortController.current?.abort();
                abortController.current = spGet(requestUrlTextField.current.value, { headers: requestHeadersTextField.current.value });
                break;
            default:
                setFetchRequest(['', false, new Error('Unsupported HTTP Method.')]);
        }
    };

    const onKeyEnter = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (event.key === 'Enter') {
            fetchRequest();
        }
    };

    const onButtonSend = (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | BaseButton | Button | HTMLSpanElement, MouseEvent>): void => {
        fetchRequest();
    };

    /* Fluent UI Props */

    const httpMethodDropdownProps: IDropdownProps = {
        styles: { 
            root: { width: 'auto'}
        },
        options: [
            { key: 'get', text: 'GET', selected: true },
            { key: 'post', text: 'POST', selected: false }
        ],
        onChange: (e, o) => onMethodChange(e, o)
    };

    const requestUrlTextFieldProps: ITextFieldProps = {
        styles: { 
            root: { width: 'auto'}
        },
        defaultValue: defaultUrl,
        componentRef: requestUrlTextField,
        onKeyDown: (e)=> onKeyEnter(e),
    };

    const requestSendButtonProps: IButtonProps = {
        styles: { 
            root: { width: 'auto'},
            flexContainer: {
                flexDirection: 'row-reverse'
            }
        },
        text: 'Send',
        iconProps: {
            iconName: 'Send'
        },
        onClick: (e) => onButtonSend(e)
    };

    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const iconId = useId('callout-button');
    const labelId = useId('callout-label');
    const descriptionId = useId('callout-description');
    const requestHeadersTextFieldProps: ITextFieldProps = {
        multiline: true,
        rows: 3,
        componentRef: requestHeadersTextField,
        onRenderLabel: () => (<Stack horizontal>
            <Stack.Item>
                <Label>Headers</Label>
            </Stack.Item>
            <Stack.Item>
                <FontIcon id={iconId} iconName='Info' className={styles.icon} onClick={toggleIsCalloutVisible} />
                {isCalloutVisible && (
                    <Callout
                    className={styles.callout}
                    ariaLabelledBy={labelId}
                    ariaDescribedBy={descriptionId}
                    role="dialog"
                    gapSpace={0}
                    target={`#${iconId}`}
                    onDismiss={toggleIsCalloutVisible}
                    setInitialFocus
                    >
                    <h4>CREATE:</h4>
                        <pre>{JSON.stringify({
                            'Accept': 'application/json;odata=nometadata',
                            'Content-type': 'application/json;odata=nometadata',
                            'odata-version': ''
                        }, null, '\t')}</pre>
                        <h4>READ:</h4>
                        <pre>{JSON.stringify({
                            'Accept': 'application/json;odata=nometadata',
                            'odata-version': ''
                        }, null, '\t')}</pre>
                        <h4>UPDATE:</h4>
                        <pre>{JSON.stringify({
                            'Accept': 'application/json;odata=nometadata',
                            'Content-type': 'application/json;odata=nometadata',
                            'odata-version': '',
                            'IF-MATCH': '*',
                            'X-HTTP-Method': 'MERGE'
                        }, null, '\t')}</pre>
                        <h4>DELETE:</h4>
                        <pre>{JSON.stringify({
                            'Accept': 'application/json;odata=nometadata',
                            'Content-type': 'application/json;odata=verbose',
                            'odata-version': '',
                            'IF-MATCH': '*',
                            'X-HTTP-Method': 'DELETE'
                        }, null, '\t')}</pre>
                    </Callout>
                )}
            </Stack.Item>
        </Stack>)
    };

    const requestBodyTextFieldProps: ITextFieldProps = {
        label: 'Body',
        multiline: true,
        rows: 4,
        componentRef: requestBodyTextField,
        disabled: isRequestBodyDisabled
    };

    const loadingSpinnerProps: ISpinnerProps = {
        size: SpinnerSize.large
    };

    return (<Stack>
        <Stack.Item>
            <Label>Request</Label>
        </Stack.Item>
        <Stack.Item>
            <Stack horizontal>
                <Stack.Item className={styles.requestUrlMethod}>
                    <Dropdown {...httpMethodDropdownProps} />
                </Stack.Item>
                <Stack.Item className={styles.requestUrlInput}>
                    <TextField {...requestUrlTextFieldProps} />
                </Stack.Item>
                <Stack.Item className={styles.requestUrlSend}>
                    <PrimaryButton {...requestSendButtonProps} />
                </Stack.Item>
            </Stack>
        </Stack.Item>
        <Stack.Item>
            <TextField {...requestHeadersTextFieldProps} />
        </Stack.Item>
        <Stack.Item>
            <TextField {...requestBodyTextFieldProps} />
        </Stack.Item>
        <Stack.Item>
            <Label>Response</Label>
            {isLoading
                ? <div className={`${styles.container} ${styles.spinner}`}>
                    <Spinner {...loadingSpinnerProps} />
                </div>
                : <div className={`${styles.container} ${styles.response}`}>
                    {error
                    ? error.message
                    : <pre>{response}</pre>}
                </div>}
        </Stack.Item>
    </Stack>);
}

export default FetchRequest;