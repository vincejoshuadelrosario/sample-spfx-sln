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
import { Callout, ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean, useId } from '@fluentui/react-hooks';

export const FetchRequest: React.FC<IFetchRequestProps> = ({defaultUrl}) => {

    /* React Hooks */

    const [ [method, isRequestBodyDisabled], setHttpMethod ] = React.useState<[method: string, isRequestBodyDisabled: boolean]>(['get', true]);
    const [ [response, isLoading, error], setFetchRequest ] = React.useState<[result: string, isLoading: boolean, error: Error]>(['', false, undefined]);
    const requestUrlTextField = React.useRef<ITextField>();
    const requestHeadersTextField = React.useRef<ITextField>();
    const requestBodyTextField = React.useRef<ITextField>();
    const abortController = React.useRef<AbortController>();

    /* Custom Hooks */

    const [ spGet ] = useSPGet(setFetchRequest);
    const [ spPost ] = useSPPost(setFetchRequest);

    /* Fluent UI Hooks */

    const [isRequestBodyCalloutErrorVisible, { toggle: toggleIsRequestBodyCalloutErrorVisible }] = useBoolean(false);
    const requestBodyInputId = useId('requestbody-input');
    const calloutRequestBodyInputErrorLabelId = useId('callout-requestbody-input-error-label');
    const calloutRequestBodyInputErrorDescriptionId = useId('callout-requestbody-input-error-description');
    const [isRequestHeadersCalloutErrorVisible, { toggle: toggleIsRequestHeadersCalloutErrorVisible }] = useBoolean(false);
    const requestHeadersInputId = useId('requestheders-input');
    const calloutRequestHeadersInputErrorLabelId = useId('callout-requestheders-input-error-label');
    const calloutRequestHeadersInputErrorDescriptionId = useId('callout-requestheders-input-error-description');
    const [isRequestHeadersCalloutInfoVisible, { toggle: toggleIsRequestHeadersCalloutInfoVisible }] = useBoolean(false);
    const calloutInfoIconId = useId('callout-info-icon');
    const calloutInfoLabelId = useId('callout-info-label');
    const calloutInfoDescriptionId = useId('callout-info-description');

    /* Functions */

    const onMethodChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
        if (option.key === 'post') {
            setHttpMethod(['post', false]);
            return;
        }

        setHttpMethod(['get', true]);
    };

    const isValidJSONString = (input: string): {} => {
        try {
            return JSON.parse(input);
        }
        catch {
            return false;
        }
    };

    const fetchRequest = (): void => {
        if (!isValidJSONString(requestHeadersTextField.current.value)) {
            toggleIsRequestHeadersCalloutErrorVisible();
            return;
        }

        switch (method) {
            case 'post':
                if (!isValidJSONString(requestBodyTextField.current.value)) {
                    toggleIsRequestBodyCalloutErrorVisible();
                    return;
                }

                abortController.current?.abort();
                abortController.current = spPost(
                    requestUrlTextField.current.value,
                    {
                        headers: JSON.parse(requestHeadersTextField.current.value),
                        body: requestBodyTextField.current.value
                    });

                break;
            case 'get':
                abortController.current?.abort();
                abortController.current = spGet(
                    requestUrlTextField.current.value,
                    {
                        headers: JSON.parse(requestHeadersTextField.current.value),
                    });

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

    const requestHeadersTextFieldProps: ITextFieldProps = {
        id: requestHeadersInputId,
        multiline: true,
        rows: 3,
        defaultValue: '{}',
        componentRef: requestHeadersTextField,
        onRenderLabel: () => (<Stack horizontal>
            <Stack.Item>
                <Label>Headers</Label>
            </Stack.Item>
            <Stack.Item>
                <FontIcon id={calloutInfoIconId} iconName='Info' className={styles.icon} onClick={toggleIsRequestHeadersCalloutInfoVisible} />
                {isRequestHeadersCalloutInfoVisible && (
                    <Callout
                    className={styles.callout}
                    ariaLabelledBy={calloutInfoLabelId}
                    ariaDescribedBy={calloutInfoDescriptionId}
                    role="dialog"
                    gapSpace={0}
                    target={`#${calloutInfoIconId}`}
                    onDismiss={toggleIsRequestHeadersCalloutInfoVisible}
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

    const requestHeadersCalloutInputErrorProps: ICalloutProps = {
        className: `${styles.callout} ${styles.error}`,
        ariaLabelledBy: calloutRequestHeadersInputErrorLabelId,
        ariaDescribedBy: calloutRequestHeadersInputErrorDescriptionId,
        role: "dialog",
        gapSpace: 0,
        target: `#${requestHeadersInputId}`,
        onDismiss: toggleIsRequestHeadersCalloutErrorVisible,
        setInitialFocus: true
    };

    const requestBodyTextFieldProps: ITextFieldProps = {
        id: requestBodyInputId,
        label: 'Body',
        multiline: true,
        rows: 4,
        componentRef: requestBodyTextField,
        defaultValue: '{}',
        disabled: isRequestBodyDisabled
    };

    const requestBodyCalloutInputErrorProps: ICalloutProps = {
        className: `${styles.callout} ${styles.error}`,
        ariaLabelledBy: calloutRequestBodyInputErrorLabelId,
        ariaDescribedBy: calloutRequestBodyInputErrorDescriptionId,
        role: "dialog",
        gapSpace: 0,
        target: `#${requestBodyInputId}`,
        onDismiss: toggleIsRequestBodyCalloutErrorVisible,
        setInitialFocus: true
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
            {isRequestHeadersCalloutErrorVisible && (
                    <Callout {...requestHeadersCalloutInputErrorProps}>
                        Invalid request headers: Please enter a valid JSON string.
                    </Callout>
                )}
        </Stack.Item>
        <Stack.Item>
            <TextField {...requestBodyTextFieldProps} />
            {isRequestBodyCalloutErrorVisible && (
                    <Callout {...requestBodyCalloutInputErrorProps}>
                        Invalid request body: Please enter a valid JSON string.
                    </Callout>
                )}
        </Stack.Item>
        <Stack.Item>
            <Label>Response</Label>
            {isLoading
                ? <div className={`${styles.container} ${styles.spinner}`}>
                    <Spinner {...loadingSpinnerProps} />
                </div>
                : <div className={`${styles.container} ${styles.response}`}>
                    {error
                    ? <pre className={styles.error}>{error.message}</pre>
                    : <pre>{response}</pre>}
                </div>}
        </Stack.Item>
    </Stack>);
}

export default FetchRequest;