User.create(name: 'Dev User', email: 'dev@dev.com', password: 'password', role: 'dev')
puts "Dev User: dev@dev.com - password"
User.create(name: 'Admin User', email: 'admin@admin.com', password: 'password', role: 'admin')
puts "Admin User: admin@admin.com - password"
User.create(name: 'User User', email: 'user@user.com', password: 'password')
puts "User: user@user.com - password"

puts "Seeding..."
10.times do
  u = User.create(
    name: Faker::Superhero.name,
    email: Faker::Internet.unique.email,
    password: 'password',
    role: 'user'
  )
  300.times do
    Telegram.create({
      user_id: u.id,
      username: Faker::Superhero.name,
      approved: false
    })
  end
end
puts "Seeding done."