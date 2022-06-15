class AddUniqueIndexToFavorites < ActiveRecord::Migration[7.0]
  def change
    add_index :favorites, [:trip_id, :user_id], unique: true
  end
end
