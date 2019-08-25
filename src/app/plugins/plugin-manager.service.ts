import { ComponentFactoryResolver, ViewContainerRef, Directive } from '@angular/core';
import { Injectable } from '@angular/core';
import { PluginInterface } from './plugin';

import { TestPlugin } from './testPlugin';

@Directive({selector: '[plugin-test]'})
export class PluginInsert {
  constructor (public viewContainerRef: ViewContainerRef){}
}

@Injectable({
  providedIn: 'root'
})
export class PluginManagerService {
  plugins = [ TestPlugin ];

  pluginInstances: Array<PluginInterface> = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    for (let plugin of this.plugins) {
      this.pluginInstances.push(new plugin());
    }
  }

  fillTableColumns(container: PluginInsert): void {
    for (let plugin of this.pluginInstances) {
      let element = plugin.TableColumnComponent();
      if (!element) {
        continue;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(element);
      let viewContainer = container.viewContainerRef;
      viewContainer.clear();
      viewContainer.createComponent(componentFactory);
    }
  }
}
