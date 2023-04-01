import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { IDisplayListsProps } from './IDisplayListsProps';
import styles from '../Demo08.module.scss';
import { IListService } from '../../../../services/core/IListsService';
import ListsService from '../../../../services/core/ListsService';
import { AppContext } from '../../../../common/AppContext';

const DisplayLists: React.FC<IDisplayListsProps> = () => {
    const [siteLists, setSiteLists] = useState<string[]>([]);
    const { serviceScope } = useContext(AppContext);

    useEffect(() => {
        const abortController = new AbortController();
        const listService = serviceScope.consume<IListService>(ListsService.ServiceKey);
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