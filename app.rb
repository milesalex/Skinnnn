require "rubygems"
require "bundler/setup"
require "omniauth"
require "omniauth-twitter"
require "dm-core"
require "dm-migrations"
require "dm-serializer/to_json"
require "dm-constraints"
require "carrierwave/datamapper"
require "route_downcaser"
require "json"
require "sinatra"
require "slim"

use RouteDowncaser::DowncaseRouteMiddleware

CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => 'AKIAJ6YGSQUDIULAULNQ',
    :aws_secret_access_key  => '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',
    :region                 => 'eu-west-1',
  }
  config.fog_directory  = 'skinnnn'
end


require "./model"
require "./helpers"
require "./routes/sass_engine"
require "./routes/authentication"
require "./routes/api"
require "./routes"
