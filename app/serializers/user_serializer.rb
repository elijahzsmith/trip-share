class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password_digest
  has_many :followers
  has_many :followees
  has_many :trips
end
