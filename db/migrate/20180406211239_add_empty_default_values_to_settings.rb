class AddEmptyDefaultValuesToSettings < ActiveRecord::Migration[5.1]
  def change
    change_column :settings, :dash_description, :text, default: ""
    change_column :settings, :regulations, :text, default: ""
    change_column :settings, :num_users, :text, default: ""
    change_column :settings, :num_shares, :text, default: ""
    change_column :settings, :telegram, :text, default: ""
    change_column :settings, :invitation_link, :text, default: ""
    change_column :settings, :telegram_invite, :text, default: ""
    change_column :settings, :etherium, :text, default: ""
    change_column :settings, :provider_social_media, :text, default: ""
    change_column :settings, :provider_rules, :text, default: ""
    change_column :settings, :rules_main, :text, default: ""
    change_column :settings, :influencer_rules, :text, default: ""
    change_column :settings, :influencer_shares, :text, default: ""
    change_column :settings, :influencer_link, :text, default: ""
    change_column :settings, :translation_rules, :text, default: ""
    change_column :settings, :translation_link, :text, default: ""
  end
end
