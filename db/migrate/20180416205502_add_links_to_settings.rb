class AddLinksToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :prov_facebook_link, :string, default: ""
    add_column :settings, :prov_twitter_link, :string, default: ""
    add_column :settings, :prov_linkedin_link, :string, default: ""
    add_column :settings, :prov_reddit_link, :string, default: ""
    add_column :settings, :dash_telegram_disc_link, :string, default: ""
    add_column :settings, :dash_telegram_anno_link, :string, default: ""
    add_column :settings, :video_link, :string, default: ""
    add_column :settings, :mod_new_post, :text, default: ""
  end
end
