import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskListContainer from './components/CustomerContext/CustomerContext.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CustomerContextPlugin';

export default class CustomerContextPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const options = { sortOrder: 1, if : props => props.selectedTaskSid != undefined };
    flex.AgentDesktopView.Panel2.Content.add(<CustomTaskListContainer key="CustomerTimelinePlugin-component" />, options);

    flex.AgentDesktopView.Panel2.Content.remove('container'); // 'container' key is the CRMContainer
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
