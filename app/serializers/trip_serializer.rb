class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :location, :description, :photo_url, :favorites, :comments, :user
  has_one :user
  belongs_to :user
  has_many :favorites
  has_many :comments
end
