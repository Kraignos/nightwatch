# Nightwatch
Manage your Watcher definitions in a beautiful way.

Nightwatch is an Elastic Search plugin which runs on your cluster and is based on Angular & Angular Material.

## Installation

> sudo elasticsearch/bin/plugin install kraignos/nightwatch

> open http://localhost:9200/_plugin/nightwatch

## Docker

> docker pull kraignos/elastic-nightwatch

> docker run -p 9200:9200 -d kraignos/elastic-nightwatch

Open http://YOUR_DOCKER_IP:9200/_plugin/nightwatch

## Limitation

You have to have the Watcher plugin and the licence plugin installed on your cluster in order to use this plugin.

## Status
Here are the features not supported by this plugin:
* chain input
* transform process
* Slack attachments
* execute a watcher outside of its triggering logic

## License

The MIT License (MIT)

Copyright (c) 2015 Antoine Picone

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
