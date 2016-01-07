# Nightwatch
Nightwatch is an Elastic Search plugin which allows you to deal with Percolator and Watcher features on your Elastic Search cluster.

You can:
* Create, edit and delete percolators
* Create and delete watchers

Nightwatch is based on Angular & Angular Material.

## Installation

> sudo elasticsearch/bin/plugin install kraignos/nightwatch
> open http://localhost:9200/_plugin/nightwatch

## Limitation

You have to have the Watcher plugin and the licence plugin installed on your cluster in order to use this plugin.

## Status
Here are the features not supported by this plugin:
* chain input
* transform process
* Slack attachments
