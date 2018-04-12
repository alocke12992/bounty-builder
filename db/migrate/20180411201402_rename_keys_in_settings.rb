class RenameKeysInSettings < ActiveRecord::Migration[5.1]
  def change
    rename_column :settings, :dash_description, :dash_overview
    remove_column :settings, :regulations
    rename_column :settings, :num_users, :dash_users
    rename_column :settings, :num_shares, :dash_tokens
    remove_column :settings, :telegram
    rename_column :settings, :invitation_link, :dash_invitation_link
    rename_column :settings, :telegram_invite, :dash_telegram
    rename_column :settings, :etherium, :dash_ethereum
    rename_column :settings, :provider_social_media, :prov_social_media
    rename_column :settings, :provider_rules, :prov_action_warning
    rename_column :settings, :rules_main, :rules_about
    rename_column :settings, :influencer_rules, :infl_submission
    rename_column :settings, :influencer_shares, :infl_bounties
    rename_column :settings, :influencer_link, :infl_link
    rename_column :settings, :translation_rules, :trans_rules
    rename_column :settings, :translation_link, :trans_link
    rename_column :settings, :logo_url, :theme_logo
    rename_column :settings, :primary_color, :theme_nav_color
    rename_column :settings, :button_color, :theme_button_color
    rename_column :settings, :video_contest, :video_rules
    rename_column :settings, :facebook, :prov_facebook
    rename_column :settings, :twitter, :prov_twitter
    rename_column :settings, :linkedin, :prov_linkedin
    rename_column :settings, :reddit, :prov_reddit
  end
end
