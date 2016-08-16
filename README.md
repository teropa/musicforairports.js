# Music for Airports

A JavaScript edition of [Ambient 1: Music for Airports 2/1](https://en.wikipedia.org/wiki/Ambient_1:_Music_for_Airports)
by Brian Eno, as built in the [JavaScript Systems Music](http://teropa.info/blog/2016/07/28/javascript-systems-music.html) guide.

See live demos [here](http://teropa.info/blog/2016/07/28/javascript-systems-music.html#putting-it-together-launching-the-loops) and [here](http://teropa.info/blog/2016/07/28/javascript-systems-music.html#exploring-variations-on-music-for-airports).

![Screenshot](/dist/screenshot.png?raw=true)

Uses instrument samples from the [Sonatina Symphonic Orchestra](http://sso.mattiaswestlund.net/download.html). You can get more of them by downloading the ZIP from their site.

Also uses an impulse response sample from [AirWindows](http://www.airwindows.com/airwindows-impulses/).

This project setup differs from the one in the article in the following:

1. The canvas visualization is included as well, not just the music.
2. Sample buffers are cached in memory instead of fetching them anew each time.
3. Babel is used for ES2015 to ES5 compilation instead of running ES2015 natively in the browser.

## Development

1. `npm install`
2. `npm run start`

This installs a live local server as well as a Babel compiler watcher. Changes in `src` are picked up automatically.

## Build and Deployment

To build the project, just invoke `npm run build`. Everything you need will be in the `dist` folder:

* `index.html` to host the application
* `musicforairport.js`, the compiled source code of the app.
* `musicforairports.min.js`, a minified version of the source code.
* `Samples` samples used to play the music and to generate the convolution reverb.

### Embedding

If you want to embed the player on an existing website, take a look at `index.html`. There are three key parts you need to take from there and add to your page:

* A `<canvas>` element with id `music-for-airports`.
* The whatwg-fetch polyfill and the Web Audio API shim libraries for cross-browser compatibility.
* The `musicforairports.js` or `musicforairports.min.js` script tag.

## License

ISC License

Copyright (c) 2016, Tero Parviainen

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
