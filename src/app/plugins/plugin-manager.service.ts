import { Component, ComponentFactoryResolver, ViewContainerRef, Directive } from '@angular/core';
import { Injectable } from '@angular/core';
import { PluginInterface, PluginAccountComponentInterface } from './plugin';
import { Account } from '../backend/models/account';

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

  private fillElements(container: ViewContainerRef, filter: any, account?: Account): void {
    for (let plugin of this.pluginInstances) {
      let element = filter(plugin);
      if (!element) {
        continue;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(element);
      container.clear();
      const componentRef = container.createComponent(componentFactory);
      if (account) {
        (<PluginAccountComponentInterface> componentRef.instance).account = account;
      }
    }
  }

  fillTableColumns(container: ViewContainerRef): void {
    this.fillElements(container, (plugin) => { return plugin.TableColumnComponent()});
  }

  fillDetails(container: ViewContainerRef, account: Account): void {
    this.fillElements(container, (plugin) => { return plugin.DetailElementComponent()}, account);
  }
}
