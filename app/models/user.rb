class User < ApplicationRecord
    # followed_users means a user can follow many users
    # following
    has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followed_users

    # following_users means a user can be followed by many users
    # followed by
    has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :following_users
end
