desc "This task is called by the Heroku scheduler add-on"
task :send_confirmation_reminders => :environment do
  if Date.today.wednesday?
    puts "Sending Emails"
    User.where(confirmed: false).each do |user|
      if EmailAddress.valid?(user.email)
        ConfirmationCodeMailer.confirmation_reminder_email(user).deliver
        user.update(reminders_sent: user.reminders_sent + 1)
      end
    end
  end
end
