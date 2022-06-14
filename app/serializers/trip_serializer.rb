class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :location, :description, :photo_url, :favorites, :comments
  has_one :user
  has_many :favorites
  has_many :comments
end
