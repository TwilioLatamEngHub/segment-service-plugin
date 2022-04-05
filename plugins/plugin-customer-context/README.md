# Customer Context Plugin

This Flex plugin renders context coming from a chatbot (using Twilio Studio or otherwise) onto the agent's screen. It also enables fetching customer traits and events from Twilio Segment

## Using Custom Attributes

This plugin will read everything on the **context** object within the Task Attributes and renders them in the screen (key and value). This approach was taken to render only relevant information to the agent.

When handing off a conversation to an agent on Flex, pass the **context** object like the example below:

![setup](screenshots/setup.png)

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

