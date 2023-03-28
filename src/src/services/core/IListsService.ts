export interface IListService {

    /**
     * Provides all the List Titles of the current site
     * @param {AbortController} abortController The AbortController for cancelling the request
     * @returns {string[]} The array of Titles
     */
    getListTitles: (abortController?: AbortController) => Promise<string[]>;
}