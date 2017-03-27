# Tab Syncing example

This example demonstrates a way to use `kafkaesque-ui` to pass data between tabs.
Go ahead and open the example multiple times, then hover the mouse on the balls and see them update their position in each tab.

To build the example we use three topics 

- `guests.joined`: When a tab is opened, an event is sent to this topic
- `guests.left`: When the tab is closed, an event is sent to this topic
- `guests.updated`: When the mouse enters a ball an event is sent to this topic with a new random position

The `GuestsBoard` component subscribes to the topics and updates its state accordingly