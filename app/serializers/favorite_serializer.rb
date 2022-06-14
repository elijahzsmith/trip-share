class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :trip, :user
  has_one :user
  has_one :trip
end
