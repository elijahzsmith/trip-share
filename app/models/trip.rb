class Trip < ApplicationRecord
  belongs_to :user

  has_many :comments, dependent: :destroy

  has_many :favorites, dependent: :destroy
  has_many :users_who_favorited, through: :favorites, source: :user
end
