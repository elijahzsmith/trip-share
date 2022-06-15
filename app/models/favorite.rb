class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :trip

  # validates :user_id, uniqueness: true, scope: :trip
end
