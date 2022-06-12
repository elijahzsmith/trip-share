require 'faker'

puts "seeding users..."
    elijah = User.create(name: "Elijah Smith", username: "elijah", email: "elijah@gmail.com", password: "123", age: 22, profile_picture: Faker::LoremFlickr.image)
    jacob = User.create(name: "Jacob Logan", username: "jacob", email: "jacob@gmail.com", password: "123", age: 24, profile_picture: Faker::LoremFlickr.image)
    mark = User.create(name: "Mark Bacon", username: "mark", email: "mark@gmail.com", password: "123", age: 29, profile_picture: Faker::LoremFlickr.image)
    elizabeth = User.create(name: "Elizabeth Treahy", username: "elizabeth", email: "elizabeth@gmail.com", password: "123", age: 30, profile_picture: Faker::LoremFlickr.image)
    rahaf = User.create(name: "Rahaf Albayashi", username: "rahaf", email: "rahaf@gmail.com", password: "123", age: 24, profile_picture: Faker::LoremFlickr.image)
    u6 = User.create(name: Faker::Name.first_name, username: Faker::Name.first_name, email: "#{Faker::Name.first_name}@gmail.com", password: "123", age: 25, profile_picture: Faker::LoremFlickr.image)
    # u6 = User.create(name: Faker::Name.first_name, username: Faker::Name.first_name, email: "#{Faker::Name.first_name}@gmail.com" password: "123", age: 25, profile_picture: Faker::LoremFlickr.image)
    # u6 = User.create(name: Faker::Name.first_name, username: Faker::Name.first_name, email: "#{Faker::Name.first_name}@gmail.com" password: "123", age: 25, profile_picture: Faker::LoremFlickr.image)
    # u6 = User.create(name: Faker::Name.first_name, username: Faker::Name.first_name, email: "#{Faker::Name.first_name}@gmail.com" password: "123", age: 25, profile_picture: Faker::LoremFlickr.image)
    # u6 = User.create(name: Faker::Name.first_name, username: Faker::Name.first_name, email: "#{Faker::Name.first_name}@gmail.com" password: "123", age: 25, profile_picture: Faker::LoremFlickr.image)
    # u6 = User.create(name: Faker::Name.first_name, username: Faker::Name.first_name, email: "#{Faker::Name.first_name}@gmail.com" password: "123", age: 25, profile_picture: Faker::LoremFlickr.image)
    #----------------------------------------------------------------
    # elijah = User.create(name: "Elijah", password: "123")
    # jacob = User.create(name: "Jacob", password: "123")
    # mark = User.create(name: "Mark", password: "123")
    # elizabeth = User.create(name: "Elizabeth", password: "123")
    # rahaf = User.create(name: "Rahaf", password: "123")
    # u6 = User.create(name: Faker::Name.first_name, password: "123")
puts "Done seeding users!"

puts "seeding follows..."
    f1 = Follow.create(follower_id: elijah.id, followee_id: jacob.id)
    f2 = Follow.create(follower_id: elijah.id, followee_id: mark.id)
    f3 = Follow.create(follower_id: rahaf.id, followee_id: mark.id)
    f4 = Follow.create(follower_id: elizabeth.id, followee_id: elijah.id)
    f5 = Follow.create(follower_id: u6.id, followee_id: elijah.id)
    f6 = Follow.create(follower_id: mark.id, followee_id: elijah.id)
puts "Done seeding follows!"

puts "seeding trips..."
    t1 = Trip.create(user_id: elijah.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t2 = Trip.create(user_id: elijah.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t3 = Trip.create(user_id: elijah.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t4 = Trip.create(user_id: jacob.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t5 = Trip.create(user_id: mark.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t6 = Trip.create(user_id: mark.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t7 = Trip.create(user_id: elijah.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t8 = Trip.create(user_id: rahaf.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t9 = Trip.create(user_id: elizabeth.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t10 = Trip.create(user_id: u6.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    t11 = Trip.create(user_id: elizabeth.id, location: Faker::Address.city, description: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 8), photo_url: Faker::LoremFlickr.image)
    # t1 = Trip.create(user_id: elijah.id)
    # t2 = Trip.create(user_id: elijah.id)
    # t3 = Trip.create(user_id: elijah.id)
    # t4 = Trip.create(user_id: jacob.id)
    # t5 = Trip.create(user_id: mark.id)
    # t6 = Trip.create(user_id: mark.id)
    # t7 = Trip.create(user_id: elijah.id)
    # t8 = Trip.create(user_id: rahaf.id)
    # t9 = Trip.create(user_id: elizabeth.id)
    # t10 = Trip.create(user_id: u6.id)
    # t11 = Trip.create(user_id: elizabeth.id)
puts "Done seeding trips!"

puts "seeding favorites..."
    Favorite.create(user_id: elijah.id, trip_id: t1.id)
    Favorite.create(user_id: elijah.id, trip_id: t2.id)
    Favorite.create(user_id: rahaf.id, trip_id: t2.id)
    Favorite.create(user_id: jacob.id, trip_id: t1.id)
    Favorite.create(user_id: mark.id, trip_id: t6.id)
    Favorite.create(user_id: mark.id, trip_id: t9.id)
    Favorite.create(user_id: jacob.id, trip_id: t11.id)
    Favorite.create(user_id: rahaf.id, trip_id: t1.id)
    Favorite.create(user_id: elizabeth.id, trip_id: t1.id)
    Favorite.create(user_id: u6.id, trip_id: t10.id)
    Favorite.create(user_id: elizabeth.id, trip_id: t2.id)
puts "Done seeding favorites!"