class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :trip
  has_one :user
  has_one :trip
end
 