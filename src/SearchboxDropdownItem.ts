import { Component, IComponentBindings, ComponentOptions, $$, get, InitializationEvents} from 'coveo-search-ui';
import { lazyComponent, lazyDependentComponent } from '@coveops/turbo-core';
import { SearchboxDropdown} from './SearchboxDropdown';

export interface ISearchboxDropdownItemOptions {
    caption: string;
    target?: string;
    default?: boolean;
    position?: string;
}

@lazyDependentComponent('SearchboxDropdown')
export class SearchboxDropdownItem extends Component {
    static ID = 'SearchboxDropdownItem';
    /**
     * The options for the component.
     * @componentOptions
     */
    static options: ISearchboxDropdownItemOptions = {
      /**
       * Specifies the caption to be displayed on the component.
       */
      caption: ComponentOptions.buildStringOption({defaultValue: ''}),
      /**
       * Specifies the target of the component. To be used in your
       * implementation, for example, in the toggle() function below.
       */
      target: ComponentOptions.buildStringOption({defaultValue: ''}),
      /**
       * Specifies whether the component is displayed when the search
       * page first loads.
       */
      default: ComponentOptions.buildBooleanOption({defaultValue: false}),
      /**
       * Specifies the position of the component.
       */
      position: ComponentOptions.buildStringOption({defaultValue: ''})
    };
    private searchboxDropdown: SearchboxDropdown = null;

    constructor(public element: HTMLElement, public options: ISearchboxDropdownItemOptions, public bindings?: IComponentBindings) {
        super(element, SearchboxDropdownItem.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, SearchboxDropdownItem, options);

        this.bind.onRootElement(InitializationEvents.afterComponentsInitialization, (args) => this.renderComponent())
    }

    /**
     * Toggles the selected item.
     */
    public toggle() {
      this.searchboxDropdown.selectItem(this);
      // This is most likely where you would include code to
      // affect the query, probably using this.options.target
    }
    private handleClick() {
      this.toggle();
    };
    private renderComponent() {
      this.searchboxDropdown = <SearchboxDropdown>get(this.element.parentElement);
      let link = $$('a', {}, this.options.caption).el;
      let item = $$('li', {class: this.options.position}, '', link).el;
      $$(link).on('click', () => this.handleClick());
      if (this.options.default) {
        this.searchboxDropdown.selectItem(this);
      }
      this.searchboxDropdown.itemList.appendChild(item);
    };
}