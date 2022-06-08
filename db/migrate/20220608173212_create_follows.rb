class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.belongs_to :follower, class_name: 'User'
      t.belongs_to :followee, class_name: 'User'

      t.timestamps
    end
  end
end
