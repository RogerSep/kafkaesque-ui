# kafkaesque-ui

A kafka inspired message system for event-driven front-end applications.

## Usages

- Syncing data across multiple tabs
- Multiplexing connections to a server (or resources in general)
- Persistency for offline applications

`kafkaesque-ui`, aka `Kui` exposes two functions, the main one being `topic`; a topic is a stream of messages that you can send events to or receive events from and react accordingly in your ui.

Topics are
- *Visible across tabs*, so events sent to a topic can be viewed between all tabs. If you don't need this, you are probably better off just using a simple in-memory rx observable for each tab instead of this library
- *Perisistent*, events are saved in `localStorage`

The other function is `start` which recieves a function of type `() => void`, it will be executed once by the leader tab, if a tab is closed, a new leader is chosen and it executes the function again

## Use it

```
npm install -S kafkaesque-ui
```

```
import Kui from "kafkaesque-ui"

// Do something once across all tabs, or when the leader tab is closed
Kui.start( () => {
  // Create a webworker?
  // Create connections with servers and send data to topics 
  //    so your connection is open only once?
} )

// Create a topic
const topic = Kui.topic( "my.app" )

// Send an event
const status = topic.send( { hello: "world!" } )


// status is an instance of [data.either](https://github.com/folktale/data.either)
// sending an event to a topic can go wrong if the localStorage is full
// or if the serialization of the object passed failed. 
// e.g. Uncaught TypeError: Converting circular structure to JSON
status.map( _ => "Ok" ).orElse( "Something went wrong" )


// Subscribe to events in a topic
topic
  .observable( { fromBeginning: true } )
  .subscribe( e => {
    console.log( e.message ) // logs the object { "hello": "world!" } sent previously

    // delete the event from localStorage
    topic.ack( e )
  } )
```

## Todo
- [ ] Review the choosing of a leader, there's currently no algorithm for doing that and the approach is too naive
- [ ] Fix the types (specially the data.either usage, it doesn't seem to play well with typescript)