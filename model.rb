DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3://#{Dir.pwd}/database.db"))

class User
  include DataMapper::Resource
  property :id,         Serial
  property :uid,        String
  property :name,       String
  property :nickname,   String
  property :created_at, DateTime

  has n, :links

end

class Link
include DataMapper::Resource
  property :id,         Serial
  property :name,       String, :required => true
  property :url,        String, :required => true

  belongs_to :user

end

DataMapper.finalize
DataMapper.auto_upgrade!