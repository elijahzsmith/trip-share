class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :location, :description, :photo_url
  has_one :user
end
