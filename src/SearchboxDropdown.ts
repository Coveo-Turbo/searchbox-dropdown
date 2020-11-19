import { Component, IComponentBindings, ComponentOptions } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface ISearchboxDropdownOptions {}

@lazyComponent
export class SearchboxDropdown extends Component {
    static ID = 'SearchboxDropdown';
    static options: ISearchboxDropdownOptions = {};

    constructor(public element: HTMLElement, public options: ISearchboxDropdownOptions, public bindings: IComponentBindings) {
        super(element, SearchboxDropdown.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, SearchboxDropdown, options);
    }
}