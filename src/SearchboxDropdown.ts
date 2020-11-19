import { Component, IComponentBindings, ComponentOptions, $$, Utils } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';
import { SearchboxDropdownItem, ISearchboxDropdownItemOptions } from './SearchboxDropdownItem';

export interface ISearchboxDropdownOptions {}

@lazyComponent
export class SearchboxDropdown extends Component {
    static ID = 'SearchboxDropdown';
    static options: ISearchboxDropdownOptions = {};
    private selectedItem: SearchboxDropdownItem = null;
    public itemList: HTMLElement = null;
    
    constructor(public element: HTMLElement, public options: ISearchboxDropdownOptions, public bindings: IComponentBindings) {
        super(element, SearchboxDropdown.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, SearchboxDropdown, options);

        this.renderComponent();
    }

    /**
     * Adds a SearchboxDropdownItem to the dropdown menu.
     * @param options The options to apply to the new item.
     */
    public addItem(options: ISearchboxDropdownItemOptions) {
      let newHTMLElement = $$('div', {class: 'SearchboxDropdownItem'}).el;
      this.element.appendChild(newHTMLElement);
      let item = new SearchboxDropdownItem(newHTMLElement, options);
    };

    private renderSelectedItem() {
      let renderedSelectedItem = $$(this.element).findClass(
                                 'coveo-custom-searchbox-dropdown-selected')[0];
      if (!Utils.isNullOrUndefined(renderedSelectedItem)) {
        renderedSelectedItem.remove();
      }
      let selectedItem = $$('span', {class: 'coveo-custom-searchbox-dropdown-selected'},
                             this.selectedItem.options.caption +
                             '<i class="fa fa-chevron-down"></i>').el;
      /**
       * If you want the chevron to appear, you need to include Font Awesome
       * (see https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css).
       * Alternatively, you could also include your own image.
       */
      this.element.appendChild(selectedItem);
    }
    /**
     * Selects a SearchboxDropdownItem.
     * @param item The item to select.
     */
    public selectItem(item: SearchboxDropdownItem) {
      this.selectedItem = item;
      this.renderSelectedItem();
    }
    /**
     * Toggles the SearchboxDropDown menu
     */
    public toggle() {
      $$(this.element).toggleClass('active');
    };
    private handleClick() {
      this.toggle();
    };
    private renderComponent() {
      this.itemList = $$('ul', {class: 'coveo-custom-searchbox-dropdown-content'}).el;
      this.element.appendChild(this.itemList);
      $$(this.element).addClass('coveo-custom-searchbox-dropdown');
      $$(this.element).on('click', () => this.handleClick());
      let that = this;
      document.onclick = function (this, event: MouseEvent) {
        if (!$$(<HTMLElement>event.target).closest(
            'coveo-custom-searchbox-dropdown')) {
          if ($$(that.element).hasClass('active')) {
            $$(that.element).toggleClass('active', false);
          }
        }
      };
    };
}