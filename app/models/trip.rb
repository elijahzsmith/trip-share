class Trip < ApplicationRecord
  belongs_to :user

  has_many :favorites
  has_many :users_who_favorited, through: :favorites, source: :user
end
