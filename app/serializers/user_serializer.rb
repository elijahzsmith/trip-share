class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :password_digest, :age, :profile_picture
  has_many :followers, serializer: UserSerializer
  has_many :followees
  has_many :trips
  has_many :favorites
end
