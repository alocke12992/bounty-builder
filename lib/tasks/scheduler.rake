desc "This task is called by the Heroku scheduler add-on"
task :send_confirmation_reminders => :environment do
  if Date.today.wednesday?
    puts "Sending Emails"
    User.where(confirmed: false).each do |user|
      if user.email && user.confirmation_code
        ConfirmationCodeMailer.confirmation_reminder_email(user).deliver
      end
    end
  end
end
