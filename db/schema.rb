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

ActiveRecord::Schema.define(version: 20180320200831) do

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
    t.jsonb "github"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "discords", "users"
  add_foreign_key "rewards", "submissions"
  add_foreign_key "rewards", "users"
  add_foreign_key "submissions", "users"
  add_foreign_key "telegrams", "users"
end
