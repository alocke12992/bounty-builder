# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180416205502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "discords", force: :cascade do |t|
    t.bigint "user_id"
    t.string "username"
    t.boolean "approved", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_discords_on_deleted_at"
    t.index ["user_id"], name: "index_discords_on_user_id"
  end

  create_table "live_streams", force: :cascade do |t|
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "url"
    t.string "kind"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "reward_id"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_posts_on_deleted_at"
  end

  create_table "rewards", force: :cascade do |t|
    t.integer "value"
    t.string "source"
    t.string "reason"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "moderator_approved", default: false
    t.datetime "deleted_at"
    t.bigint "submission_id"
    t.bigint "post_id"
    t.index ["deleted_at"], name: "index_rewards_on_deleted_at"
    t.index ["post_id"], name: "index_rewards_on_post_id"
    t.index ["submission_id"], name: "index_rewards_on_submission_id"
    t.index ["user_id"], name: "index_rewards_on_user_id"
  end

  create_table "settings", force: :cascade do |t|
    t.text "dash_overview", default: ""
    t.text "dash_users", default: ""
    t.text "dash_tokens", default: ""
    t.text "dash_invitation_link", default: ""
    t.text "dash_telegram", default: ""
    t.text "dash_ethereum", default: ""
    t.text "prov_social_media", default: ""
    t.text "prov_action_warning", default: ""
    t.text "rules_about", default: ""
    t.text "infl_submission", default: ""
    t.text "infl_bounties", default: ""
    t.text "infl_link", default: ""
    t.text "trans_rules", default: ""
    t.text "trans_link", default: ""
    t.string "theme_logo", default: ""
    t.string "theme_nav_color", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "theme_button_color", default: ""
    t.text "video_rules", default: ""
    t.boolean "prov_facebook", default: false
    t.boolean "prov_twitter", default: false
    t.boolean "prov_linkedin", default: false
    t.boolean "prov_reddit", default: false
    t.string "theme_button_font_color", default: "#000000"
    t.string "theme_button_border_color", default: ""
    t.boolean "infl_show", default: false
    t.boolean "trans_show", default: false
    t.boolean "video_show", default: false
    t.string "prov_facebook_link", default: ""
    t.string "prov_twitter_link", default: ""
    t.string "prov_linkedin_link", default: ""
    t.string "prov_reddit_link", default: ""
    t.string "dash_telegram_disc_link", default: ""
    t.string "dash_telegram_anno_link", default: ""
    t.string "video_link", default: ""
    t.text "mod_new_post", default: ""
  end

  create_table "submissions", force: :cascade do |t|
    t.string "url"
    t.boolean "accepted", default: false
    t.bigint "user_id"
    t.string "kind"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_submissions_on_deleted_at"
    t.index ["user_id"], name: "index_submissions_on_user_id"
  end

  create_table "telegrams", force: :cascade do |t|
    t.bigint "user_id"
    t.string "username"
    t.boolean "approved", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_telegrams_on_deleted_at"
    t.index ["user_id"], name: "index_telegrams_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "wallet"
    t.string "facebook"
    t.string "twitter"
    t.string "linkedin"
    t.string "reddit"
    t.string "blog"
    t.string "influencer"
    t.string "incoming_invite_code"
    t.string "outgoing_invite_code"
    t.datetime "deleted_at"
    t.string "role", default: "user"
    t.boolean "blocked", default: false
    t.string "confirmation_code"
    t.boolean "confirmed", default: false
    t.integer "reminders_sent", default: 0
    t.boolean "translator", default: false
    t.boolean "is_influencer", default: false
    t.jsonb "api_token"
    t.boolean "live_stream_confirmed", default: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "discords", "users"
  add_foreign_key "rewards", "posts"
  add_foreign_key "rewards", "submissions"
  add_foreign_key "rewards", "users"
  add_foreign_key "submissions", "users"
  add_foreign_key "telegrams", "users"
end
