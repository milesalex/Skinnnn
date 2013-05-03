DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3://#{Dir.pwd}/database.db"))

class CoverUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  storage :fog

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def default_url
    "http://art.yale.edu/image_columns/0001/3987/tumblr_m7kaxdluz31rbivvmo1_400.gif"
  end
end

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

  mount_uploader :cover, CoverUploader

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
