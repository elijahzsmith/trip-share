class AddDetailsToTrips < ActiveRecord::Migration[7.0]
  def change
    add_column :trips, :location, :string
    add_column :trips, :description, :string
    add_column :trips, :photo_url, :string
  end
end
