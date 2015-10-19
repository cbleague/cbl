var dest = "./public";
var src = './src';

module.exports = {

   //if you create a folder not listed here that contains js files add the path here
  javascript: {
    src: src + '/app/*.js',
    dest: dest + '/js/',
    entryPoint: src + '/entry.js',
    packedFile: 'packed.js'
  },
  sass: {
    src: src + "/styles/**/*.{sass,scss}",
    dest: dest + '/styles/',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
    }
  },
  fonts: {
      src: src + '/styles/fonts/*',
      dest: dest + "/styles/fonts/",
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },
  index: {
    src: src + "/index.html",
    dest: dest
  },
  //if you create a folder not listed here that contains html files add the path here
  html: {
    src: src + "/**/*.html",
    dest: dest + "/html/"
  },
  server: {
    src: dest,
    livereload: true,
    directoryListing: false,
    open: false,
    port: 8000
  },
  production: {
    cssSrc: dest + '/styles/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
