
module.exports = getBrowserifyBuiltins

function getBrowserifyBuiltins() {
  return {
    assert: 'assert',
    buffer: 'buffer',
    // console: 'console-browserify',
    // constants: 'constants-browserify',
    crypto: 'crypto-browserify',
    // domain: 'domain-browser',
    events: 'events',
    // http: 'stream-http',
    // https: 'https-browserify',
    // os: 'os-browserify/browser.js',
    os: 'os-browserify',
    path: 'path-browserify',
    // punycode: 'punycode',
    // querystring: 'querystring-es3',
    stream: 'stream-browserify',
    // _stream_duplex: 'readable-stream/duplex.js',
    // _stream_passthrough: 'readable-stream/passthrough.js',
    // _stream_readable: 'readable-stream/readable.js',
    // _stream_transform: 'readable-stream/transform.js',
    // _stream_writable: 'readable-stream/writable.js',
    string_decoder: 'string_decoder',
    // sys: 'util/util.js',
    // timers: 'timers-browserify',
    // tty: 'tty-browserify',
    url: 'url',
    // util: 'util/util.js',
    util: 'util',
    // vm: 'vm-browserify',
    // zlib: 'browserify-zlib',
    // _process: 'process/browser',
    _process: 'process',
    // perf_hooks: './_empty.js',
    // child_process: './_empty.js',
    // cluster: './_empty.js',
    // dgram: './_empty.js',
    // dns: './_empty.js',
    // fs: './_empty.js',
    // http2: './_empty.js',
    // inspector: './_empty.js',
    // module: './_empty.js',
    // net: './_empty.js',
    // readline: './_empty.js',
    // repl: './_empty.js',
    // tls: './_empty.js',
    fs: 'empty-package',
    vm: 'empty-package',
    https: 'empty-package',
    http: 'empty-package',
    net: 'empty-package',
    tls: 'empty-package',
    zlib: 'empty-package',
  }
}