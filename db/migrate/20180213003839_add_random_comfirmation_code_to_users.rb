class AddRandomComfirmationCodeToUsers < ActiveRecord::Migration[5.1]
  def change
    User.all.each do |u|
      if u.confirmation_code == nil || u.confirmation_code.length != 8
        o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
        u.update_attribute(:confirmation_code, (0...8).map { o[rand(o.length)] }.join)
      end
    end
  end
end
