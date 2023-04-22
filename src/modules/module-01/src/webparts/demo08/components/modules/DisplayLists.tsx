import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { IDisplayListsProps } from './IDisplayListsProps';
import styles from '../Demo08.module.scss';
import ListsService from '../../../../services/business/ListsService/ListsService';
import { AppContext } from '../../../../common/AppContext';
import { IListService } from '../../../../services/business/ListsService/IListsService';

const DisplayLists: React.FC<IDisplayListsProps> = () => {
    const [siteLists, setSiteLists] = useState<string[]>([]);
    const { serviceScope } = useContext(AppContext);

    useEffect(() => {
        const abortController = new AbortController();
        const listService = serviceScope.consume<IListService>(ListsService.serviceKey);
        const getLists = async (): Promise<string[]> => await listService.getListTitles(abortController);
        getLists().then((lists) => setSiteLists(lists))
            .catch(error => {
                if(abortController.signal.aborted)
                {
                    return;
                }

                console.error(error);
            })

        return () => abortController.abort();
      }, []);
      
    return (
      <section className={styles.displayLists}>
        {
            siteLists.length === 0
            ? <span>Loading...</span>
            : (
            <div>
                <ul>
                {
                    siteLists.map((title: string, index: number) => {
                    return <li key={index}>{title}</li>;
                    })
                }
                </ul>
            </div>
            )
        }
      </section>
    );
};

export default DisplayLists;