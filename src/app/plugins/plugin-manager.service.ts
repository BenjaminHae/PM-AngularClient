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

  private fillElementsWithAccount(container: ViewContainerRef, filter: any, account: Account): void {
    this.fillElements(container, filter, (component: PluginAccountComponentInterface) => {
      component.account = account;
    });
  }

  private fillElements(container: ViewContainerRef, filter: any, setData?: any): void {
    container.clear();
    for (let plugin of this.pluginInstances) {
      let element = filter(plugin);
      if (!element) {
        continue;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(element);
      const componentRef = container.createComponent(componentFactory);
      if (setData) {
        setData(<PluginAccountComponentInterface> componentRef.instance);
      }
    }
  }

  fillTableColumns(container: ViewContainerRef): void {
    this.fillElements(container, (plugin) => { return plugin.TableColumnComponent()});
  }

  fillDetails(container: ViewContainerRef, account: Account): void {
    this.fillElementsWithAccount(container, (plugin) => { return plugin.DetailElementComponent()}, account);
  }

  fillEdit(container: ViewContainerRef, account: Account): void {
    this.fillElementsWithAccount(container, (plugin) => { return plugin.EditElementComponent()}, account);
  }

  fillOverview(container: ViewContainerRef, accounts: Array<Account>) {
    this.fillElements(container, (plugin) => { return plugin.OverviewComponent()}, (component) => {component.accounts = accounts});
  }

}
