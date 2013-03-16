require "rubygems"
require "bundler/setup"
require "omniauth"
require "omniauth-twitter"
require "dm-core"
require "dm-migrations"
require "dm-serializer/to_json"
require "dm-constraints"
require "route_downcaser"
require "json"
require "sinatra"

use RouteDowncaser::DowncaseRouteMiddleware

require "./model"
require "./helpers"
require "./sass_engine"
require "./routes"
