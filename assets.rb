assets do
  #js_compression :closure
  js_compression :uglify

  js :main, '/js/main.js', [
    '/js/libs/jquery-1.8.3.min.js',
    '/js/libs/underscore-min.js',
    '/js/libs/backbone-min.js',
    '/jst.js',
    '/js/application.js'
  ]

  css :main, '/css/main.css', [
    '/css/*.css',
    '/css/style.css'
  ]

  #prebuild true
end