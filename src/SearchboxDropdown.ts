import { Component, IComponentBindings, ComponentOptions, $$, Utils } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';
import { SearchboxDropdownItem, ISearchboxDropdownItemOptions } from './SearchboxDropdownItem';

export interface ISearchboxDropdownOptions {}

@lazyComponent
export class SearchboxDropdown extends Component {
    static ID = 'SearchboxDropdown';
    static arrowDownIcon = `<svg alt=\"Arrow Down\" focusable=\"false\" enable-background=\"new 0 0 10 6\" viewBox=\"0 0 10 6\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"currentColor\"><path d=\"m5 5.932c-.222 0-.443-.084-.612-.253l-4.134-4.134c-.338-.338-.338-.886 0-1.224s.886-.338 1.224 0l3.522 3.521 3.523-3.521c.336-.338.886-.338 1.224 0s .337.886-.001 1.224l-4.135 4.134c-.168.169-.39.253-.611.253z\"></path></g></svg>`;
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
                             SearchboxDropdown.arrowDownIcon).el;
      let arrowDownSvg = $$(selectedItem).find('svg');
      if (arrowDownSvg) {
          arrowDownSvg.classList.add('coveo-custom-searchbox-dropdown-down-icon-svg');
      }
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