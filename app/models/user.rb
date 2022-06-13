require 'bcrypt'
class User < ApplicationRecord
    has_secure_password
    # followed_users means a user can follow many users
    # following
    has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followed_users

    has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :following_users

    has_many :trips 

    has_many :favorites

    # all the trips that (they themselves) have favorited
    has_many :favorited_trips, through: :favorites, source: :trip

    has_many :comments


    # Validations: username
    validates :username, presence: true
    validates :username, uniqueness: true
    # Validations: password
    validates :password, presence: true, on: :create 
    validates :password, length: { minimum: 2 }, on: :create
    # Validations: age
    validates :age, presence: true
    # validates :age, numericality: { greater_than_or_equal_to: 18 }

    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
    validate :permitted_emails

    def permitted_emails
        unless email.match?(/gmail.com|yahoo.com|icloud.com/)
            errors.add(:permitted_emails, "Sorry, that email isn't permitted.")
        end
    end 
end
