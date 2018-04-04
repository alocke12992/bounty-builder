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

ActiveRecord::Schema.define(version: 20180403215502) do

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
    t.text "dash_description", default: "<p>Deconet makes software development sustainable by equitably rewarding contributors using the the economic infrastructure and technology of the blockchain.</p><p><br></p><p>The Deconet bounty program aims to include the global developer community and innovation partners in building a more rewarding and more innovative economic system for the creators and maintainers of today’s digital infrastructure.</p>"
    t.text "regulations", default: "<p><strong>DO</strong>:</p<ul><li><strong>Disclose that you are receiving DCO for growing the community</strong>:&nbsp;<span style=\"font-size: 10.5pt;\">“Disclaimer: I am receiving DCO for growing the community.”</span></li><li><strong>When you talk about Deconet, focus on the importance of the solution</strong>:&nbsp;<span style=\"font-size: 10.5pt;\">creating a sustainable economic backbone for open source development and paving a path to more distributed, remote, and gig-based work.</span></li><li><strong>Explain what the utility of the DCO token is</strong>:<span style=\"font-size: 10.5pt;\">&nbsp;the token is used to access and power the crowd curation element of Deconet’s software platform. Also, companies and blockchain projects can use the token to create challenges for the Deconet community.</span></li</ul<p><br</p<p><strong>DON’T</strong>:</p<ul><li><strong>Don’t refer to DCO token as an investment</strong>:&nbsp;<span style=\"font-size: 10.5pt;\">the Deconet token has utility from day one, allowing the crowd to access and curate software projects on the Deconet platform.</span></li><li><strong>Don’t use the terms \"ICO\" or \"initial coin offering.</strong>\"&nbsp;<span style=\"font-size: 10.5pt;\">You can say \"token generation\".</span></li><li><strong>Don’t discuss or hint at price increasing.</strong></li><li><strong>Don’t discuss exchanges.</strong></li</ul<p><br</p>"
    t.text "num_users", default: "<ul><li>0 - 2,500 users will release 1,000,000 of the total token allocation</li><li>2,501 - 5,000 users will release 2,500,000 tokens</li><li>5,001 - 10,000 users will release 5,000,000 tokens</li><li>Over 10,000 users on the bounty will release 7,500,000 tokens</li</ul<p><br</p>"
    t.text "num_shares", default: "<ul><li>0-150 Shares: 10% of the total bounty pool</li><li>151-500: 20% of total bounty pool</li><li>501-1000: 30% of total bounty pool</li><li>Over 1000 shares: 40% of the total bounty pool</li</ul<p><br</p>"
    t.text "telegram", default: "<p>All users must register to the&nbsp;<a href=\"https://t.me/deco_network\" target=\"_blank\" style=\"background-color: transparent; color: rgb(65, 131, 196);\">official Telegram Channel Account&nbsp;</a>to be eligible for bounty program.</p><p>20 Shares to Join the Telegram group (required)</p>"
    t.text "invitation_link", default: "<p><strong style=\"font-size: large;\">Invite Link</strong>:</p<p><br</p<p>Use this URL to invite people to join the bounty program.</p<p><br</p<p>When someone joins using your invite code, both parties will receive 50 shares.</p<p><br</p<p><a href=\"http://localhost:3000/register?invite_code=03e1bd28-28d4-409f-a382-c966160a6c84\" target=\"_blank\" style=\"color: rgb(65, 131, 196); font-family: Lato, &quot;Helvetica Neue&quot;, Arial, Helvetica, sans-serif; font-size: 14px;\">http://localhost:3000/register?invite_code=03e1bd28-28d4-409f-a382-c966160a6c84</a</p>"
    t.text "telegram_invite", default: "<p><span style=\"color: rgba(0, 0, 0, 0.87); font-family: Lato, &quot;Helvetica Neue&quot;, Arial, Helvetica, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">Join the Telegram group below. After, enter the username you joined the group with and then press Submit for Approval. This may only be done once.</span></p>"
    t.text "etherium", default: "<p class=\"ql-align-center\"><strong>Warning!</strong>&nbsp;You may only enter your Ethereum address once. After that, it will not be able to be changed.</p<p class=\"ql-align-center\">Ethereum address must not be tied to an exchange, it must be a separate, standard wallet.</p<p><br</p>"
    t.text "provider_social_media", default: "<p><strong><em>Social Media: Facebook, Linkedin, or Twitter</em></strong</p<p><strong><em><span class=\"ql-cursor\">﻿</span></em></strong</p<p><em>&nbsp;20 shares: Follow/Subscribe/Like Deconet on FB, Twitter, LinkedIn, and Reddit</em</p>"
    t.text "provider_rules", default: "<h1 class=\"ql-align-center\">Important,&nbsp;by pressing an action button such as 'I Subscribed' or 'I liked this post' you must be certain that you actually did like the post, follow a page etc.</h1<h1 class=\"ql-align-center\">In the username field above, you MUST enter EXACTLY the name that appears under the like section of a facebook, twitter linkedin post etc.</h1<h1 class=\"ql-align-center\">Moderators are actively reviewing bounty claims. Anyone found with an ingenuine bounty claim will be&nbsp;removed&nbsp;from the program with their shares&nbsp;revoked.</h1<p><br</p>"
    t.text "rules_main", default: "<h1>Rules and Distribution</h1<p><span style=\"font-size: 10.5pt;\">This&nbsp;</span><span style=\"font-size: 10.5pt; background-color: white;\">bounty program is the best way to involve and reward the Deconet community for your help in sharing our common mission with the global technical community and beyond. With every one of your shares, we grow Deconet’s core supporters, reach new audiences,and enable a healthier distribution of tokens at the inception of the Deconet economy.</span</p<p><span style=\"font-size: 10.5pt; background-color: white;\"><span class=\"ql-cursor\">﻿</span></span</p<p><span style=\"font-size: 15pt;\">Rules and Distribution</span</p<p><span style=\"font-size: 10.5pt;\">The Deconet team is allocating up to 7,500,000 tokens for this bounty program - and you have many methods of earning your share, with more earning opportunities to come. Bounties range from simply engaging with Deconet on social media; to craftingoriginal content to be published to our blog; to translating our whitepaper into new languages; to even writing software to be published on the Deconet platform!</span</p<p><span style=\"font-size: 10.5pt;\">The bounty program plans to release as many as 7,500,000 tokens (or 1.7% of the total token pool) on the basis of total users engaged in bounty hunting. That means you’ll be increasing the total size of the earnable bounty by inviting your friends!</span</p<p><em>Less than 2,500 users = 1,000,000 tokens released</em</p<p><em>Between 2,501 to 5,000 users = 2,500,000 tokens released</em</p<p><em>Between 5,001 to 10,000 = 5,000,000 tokens released</em</p<p><em>More than 10,000 users = 7,500,000 tokens released</em</p<p><em>&nbsp;</em</p<p><em>Bounties will be distributed when the token sale smart contract is created and distributes tokens at the close of the token sale. Please allow up to three weeks to receive your tokens.</em</p<p><em>Note: A share is a reward for completing a task and a part of a total offering. For instance, if one participants collect 10 share during a bounty program and a total of 100 shares have been issued that participant would have 10% of the total tokenoffering. (Individual shares/total shares)(total token allocated)</em</p<p><em>Total Participation bonuses: To incentivize participants to refer friends to participate we have included a total participants bonus.&nbsp;There are milestones based of the number of participants enrolled in the bounty program. When the participantcount clears those milestone the total amount of tokens for the program will increase.</em</p<p><em>Individual participation bonuses: We want to reward those that</em</p>"
    t.text "influencer_rules", default: "<h2>Submit Your Own Content</h2<p><br</p<p>If you use an influencing platform such as a blog, video site, social media etc, you may submit your own content for shares.</p<ol><li>Submit your social media account.</li><li>If approved you will be contacted via social media.</li><li>Any posts created without approval will not be rewarded</li><li>Create your content.</li><li>Post a URL to your content (beginning with https)</li><li>A moderator will review your submission and award shares according to the share rules.</li</ol<p><br</p>"
    t.text "influencer_shares", default: "<p><strong style=\"font-size: 16px;\">Shares for Blog and Reddit posts:</strong</p<p><br</p<p>*Posts must include the statement: “I am receiving DCO for growing the community.”</p<p><br</p<p><em>250 shares for 100-500 followers</em</p<p><br</p<p><em>500 shares for 501-1000 followers</em</p<p><br</p<p><em>750 shares for 1001-10,000 followers</em</p<p><br</p<p><em>1000 shares for 10,001-50,000 followers</em</p<p><br</p<p><em>2500 shares for 50,001-100,000 followers</em</p<p><br</p<p><em>5000 shares for 100,001+ followers</em</p>"
    t.text "influencer_link", default: "<p>Please submit your social media account by using&nbsp;<a href=\"https://goo.gl/forms/UM8pMKI3XraKqQXv2\" target=\"_blank\" style=\"background-color: transparent; color: rgb(65, 131, 196);\">this link</a>.</p<p>If you are approved to translate, you will be contacted by social media.</p>"
    t.text "translation_rules", default: "<h2>Translation Services</h2<p>***The use of google translator or similar is not allowed. Participants using google translator will not be accepted.</p<p>&nbsp;</p<ul><li>Reward starts at 1000 shares per translation of white paper and may be increased based on quality of translation.</li</ul<p>&nbsp;</p<ul><li>Users in the bounty program can reserve translation by submitting a link to a sample translation and an email.</li</ul<p>&nbsp;</p<ul><li>User will be able to see whether translations have been accepted from the Translation tab.</li</ul<p><br</p>"
    t.text "translation_link", default: "<p>Please submit a sample translation using&nbsp;<a href=\"https://goo.gl/forms/Tdqnd3won6vuhz3E3\" target=\"_blank\" style=\"background-color: transparent; color: rgb(65, 131, 196);\">this link</a>.</p<p>If you are approved to translate, you will be contacted by email.</p>"
    t.string "logo_url", default: "http://www.hsdtaxlaw.com/wp-content/uploads/2016/05/logo_placeholder.png"
    t.string "primary_color", default: "#2c83ed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "button_color", default: "#50e3c2"
    t.text "video_contest", default: "<h2>Video Contest</h2><p><br></p><p><strong style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Video Contest rules:</strong></p><p><br></p><p><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Answer the question:</span></p><p><br></p><p><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">What would you do with the power of Neureal?</span></p><ul><li><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Videos must be 150 seconds or shorter.</span></li><li><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Video must include brief explanation of what Neureal is in your own words.</span></li><li><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Video may contain no offensive material.</span></li></ul><p><br></p><p><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">The Neureal core team will select 10 finalists and the community will vote on the grand prize winner.</span></p><p><br></p><p><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">By entering the contest, you grant Neureal and its subsidiaries permission to use your video and all content, including your name, likeness, slogans, and descriptions, in corporate and promotional materials.</s<<span style=\"font-size: 18px;\">&nbsp;</s<<em style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Submission window for entries begins March 28th and runs until the end of the Neureal public token sale. Finalists will be announced on the final day of the token sale and winners will be announced 60 days after the completion of the token sale.<<<span style=\"font-size: 18px;\">&nbsp;</s<<strong style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Prizes:</str<<<span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">Ten finalists will each receive 100 NEUREAL tokens to use toward the execution of their vision and how they’d use the power of Neureal.</s<<<span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">One grand prize winner receives 1000 NEUREAL tokens to use toward the execution of their vision and how they’d use the power of Neureal, and the Neureal foundation will help in executing their Oracle(s) once Neureal is released to the public (estimated2 years from close of the TGE).</s<u<li><span style=\"font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);\">A folder will be posted in the Neureal Telegram containing any graphics for our project you may want.</spa<</ul>"
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
