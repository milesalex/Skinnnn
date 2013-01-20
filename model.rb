DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3://#{Dir.pwd}/database.db"))

class User
  include DataMapper::Resource
  property :id,         Serial
  property :uid,        String
  property :name,       String
  property :nickname,   String
  property :email,      String
  property :created_at, DateTime

  has 1, :profile, :constraint => :destroy
end

class Profile
  include DataMapper::Resource
  property :id,    Serial
  property :bio,   String
  property :city,  String
  belongs_to :user

  has n, :links, :constraint => :destroy
end

class Link
  include DataMapper::Resource
  property :id,    Serial
  property :name,  String
  property :url,   String
  belongs_to :profile
end


DataMapper.finalize
DataMapper.auto_upgrade!