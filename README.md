# Music for Airports

A JavaScript edition of [Ambient 1: Music for Airports 2/1](https://en.wikipedia.org/wiki/Ambient_1:_Music_for_Airports)
by Brian Eno.

Uses instrument samples from the [Sonatina Symphonic Orchestra](http://sso.mattiaswestlund.net/download.html). You can get more of them by downloading the ZIP from their site. also uses an impulse response sample
from [AirWindows](http://www.airwindows.com/airwindows-impulses/).

This project setup differs from the one in the article in the following:

1. Sample buffer are cached in memory instead of fetching them anew each time.
2. Babel is used for ES2015 to ES5 compilation instead of running ES2015 natively in the browser.

## Development

1. `npm install`
2. `npm run start`

This installs a live local server as well as a Babel compiler watcher. Changes in `src` are picked up automatically.

## License

ISC License

Copyright (c) 2016, Tero Parviainen

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
