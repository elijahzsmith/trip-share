class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :username, :string
    add_column :users, :email, :string
    add_column :users, :age, :integer
    add_column :users, :profile_picture, :string
  end
end
