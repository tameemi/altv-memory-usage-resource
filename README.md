# altv-memory-usage-resource
Just a simple resource that logs memory usage every 1 minute and displays on a graph every 1s. Can be useful to detect memory leaks and to see if your code is clean for v8 garbage collector.

### Prerequisites
* Create a folder called "memory-usage" and place it in resources.
* Edit server.cfg and add "memory-usage" to resources.

**NOTE:** This project has only been tested with Windows environments.

### In-game graph
* **F5** - Toggles the in-game graph.
![in game picture](https://i.imgur.com/HI5EFjU.png)

memory usage log outputs to > output-data/memoryUsage.json
