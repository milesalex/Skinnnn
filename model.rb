DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3://#{Dir.pwd}/database.db"))

class User
  include DataMapper::Resource
  property :id,         Serial
  property :uid,        String
  property :name,       String
  property :nickname,   String
  property :email,      String
  property :bio,        String
  property :city,       String
  property :created_at, DateTime

  has n, :links, :constraint => :destroy
end

class Link
  include DataMapper::Resource
  property :id,               Serial
  property :name,             String
  property :url,              String
  property :previous_link_id, Integer

  belongs_to :user
end

DataMapper.finalize
DataMapper.auto_upgrade!
