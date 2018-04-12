class Setting < ApplicationRecord
  def self.current
    first_or_create(
      dash_overview: "<p>Deconet makes software development sustainable by equitably rewarding contributors using the the economic infrastructure and technology of the blockchain.</p><p><br></p><p>The Deconet bounty program aims to include the global developer community and innovation partners in building a more rewarding and more innovative economic system for the creators and maintainers of today’s digital infrastructure.</p>",
      dash_users: "<ul><li>0 - 2,500 users will release 1,000,000 of the total token allocation</li><li>2,501 - 5,000 users will release 2,500,000 tokens</li><li>5,001 - 10,000 users will release 5,000,000 tokens</li><li>Over 10,000 users on the bounty will release 7,500,000 tokens</li></ul>",
      dash_tokens: "<ul><li>0-150 Shares: 10% of the total bounty pool</li><li>151-500: 20% of total bounty pool</li><li>501-1000: 30% of total bounty pool</li><li>Over 1000 shares: 40% of the total bounty pool</li></ul>",
      dash_invitation_link: "<h4>Invite Link:</h4><p>Use this URL to invite people to join the bounty program.</p><p>When someone joins using your invite code, both parties will receive 50 tokens.</p>",
      dash_telegram: "<p>Join both Telegram groups below. After, enter the username you joined the groups with and then press Submit for Approval. This may only be done once.</p><p>60 tokens to join the Telegram groups (required)</p>",
      dash_ethereum: "<p class='ql-align-center'><strong>Warning!</strong>&nbsp;You may only enter your Ethereum address once. After that, it will not be able to be changed.Ethereum address must not be tied to an exchange, it must be a separate, standard wallet.</p>",
      prov_social_media: "<p><strong><em>Social Media: Facebook, LinkedIn, or Twitter&nbsp;</em></strong></p><p><em>20 shares: Follow/Subscribe/Like Deconet on FB, Twitter, LinkedIn, Reddit, etc.</em></p>",
      prov_action_warning: "<p><strong>Important,</strong>&nbsp;by pressing an action button such as 'I Subscribed' or 'I liked this post' you must be certain that you actually did like the post, follow a page etc.</p><p><br></p><p>Moderators are actively reviewing bounty claims. Anyone found with an ingenuine bounty claim will be&nbsp;<strong>removed</strong>&nbsp;from the program with their shares&nbsp;<strong>revoked.</strong></p>",
      rules_about: "<h1>Rules and Distribution</h1><p><br></p><p><span style='color: black;'>The Deconet bounty program is a way to reward community members for helping grow the community and generate increased awareness of the Deconet project.</span></p><p><br></p><p><strong style='color: black;'>All participants must enter a code from the weekly live stream to receive any earned rewards.</strong></p><p><span style='color: black;'>When working on anything for the Deconet bounty program you must adhere to the following guidelines.</span></p><ul><li>Do not use the term investor, use the term contributor or purchaser when referring to people who are buying or receiving token.</li><li>Do not use the term ICO, use the term TGE or Token Generation Event when referring to the public token sale.</li><li>Make no promise of return or guaranteed increase in the value of a financial or time contribution.</li><li>Prior to posting, have a basic familiarity with all documents on <span style='color: rgb(0, 0, 0);'>Deconet</span>’s alpha sale site&nbsp;<a href='http://alphasale.deconet.net/' target='_blank' style='color: rgb(65, 131, 196); background-color: rgb(255, 255, 255);'>http://alphasale.deconet.net</a>.</li><li>Be professional at all times and edit for grammar and punctuation. In the event of typos, fix immediately.</li><li>In the event of comments and discussions on a post, refer questions back to the Deconet Telegram group by posting a link to&nbsp;<a href='https://t.me/joinchat/C8JtFgzGzcsN_tjxoYBH1A' target='_blank' style='color: rgb(65, 131, 196);'>https://t.me/joinchat/C8JtFgzGzcsN_tjxoYBH1A</a></li><li>Include a link to the Deconet Telegram group as a call to action at the end of every post.&nbsp;<a href='https://t.me/joinchat/C8JtFgzGzcsN_tjxoYBH1A' target='_blank' style='color: rgb(65, 131, 196);'>https://t.me/joinchat/C8JtFgzGzcsN_tjxoYBH1A</a></li><li>Use Deconet’s branding hashtags wherever possible.</li><li class='ql-indent-1'>#DeconetAI</li></ul><p><br></p><p><strong style='color: black;'>The following are misconceptions to be aware of when posting:</strong></p><ul><li>The ability to purchase tokens will be limited to certain countries. Be aware of the most current list.&nbsp;<a href='https://docs.google.com/document/d/1v7CvHlYUvRKfWKNadxxyyc4uFjoaMniRZTggwrWcR7I' target='_blank' style='color: rgb(65, 131, 196);'>https://docs.google.com/document/d/1v7CvHlYUvRKfWKNadxxyyc4uFjoaMniRZTggwrWcR7I</a></li><li>Although the project name is spelled similarly, we are not building a neural network.</li><li>We have a working product, but we believe it's not ready for public use until it has passed internal testing and auditing, has proven its security, its ability to scale, and its capability for increased accuracy.</li><li>The token will not be put on a market, or usable, until its release (approximately two-years post-TGE).</li></ul><p><span style='color: black;'>&nbsp;</span></p><p><strong style='color: black;'>Distribution</strong></p><p><span style='color: black;'>Participants can earn in many ways at many levels. Some are simple, such as engaging with us on social media, and others are more rewarding, such as translating documents into other languages.</span></p><p><span style='color: black;'>&nbsp;</span></p><p><strong style='color: black;'>The bounty program will release up to 1,000,000 tokens or 1% of the Foundation’s total token allocation. </strong></p><p><strong style='color: black;'>The amount released is dependent on the sliding scale for users:</strong></p><p><strong style='color: black;'>0-500 users = 250,000 tokens released</strong></p><p><strong style='color: black;'>501- 1000 users = 500,000 tokens released</strong></p><p><strong style='color: black;'>Over 2000 users = 1,000,000 tokens released</strong></p><p><br></p><p><strong>Bounties will be distributed at the end of the token sale. (Please allow up to three weeks to receive tokens) </strong></p>",
      infl_submission: "<h2>Submit Your Own Content</h2><p><br></p><p>If you use an influencing platform such as a blog, video site, social media etc, you may submit your own content for tokens*.</p><ol><li>Submit your social media account.</li></ol><ul><li class='ql-indent-1'>If approved, you will be contacted via social media.</li><li class='ql-indent-1'>Any posts created without approval will not be rewarded.</li></ul><ol><li>Create your content.</li><li>Post a URL to your content (beginning with https).</li><li>A moderator will review your submission and award shares according to the share rules.</li></ol><p><br></p><p>*Tokens are awarded based on quality of content.</p>",
      infl_bounties: "<h3>Available Influencer Bounties</h3><p><strong><span style={{ fontSize: 16 }}>Shares for Blog and Reddit posts:</span></strong></p><p>*Posts must include the statement: &ldquo;Iam receiving DCO for growing thecommunity.&rdquo;</p><p><em>250 shares for 100-500 followers</em></p><p><em>500 shares for 501-1000 followers</em></p><p><em>750 shares for 1001-10,000 followers</em></p><p><em>1000 shares for 10,001-50,000 followers</em></p><p><em>2500 shares for 50,001-100,000 followers</em></p><p><em>5000 shares for 100,001+ followers</em></p>",
      infl_link: "<p>Please submit your social media account by using&nbsp;<a href='https://goo.gl/forms/UM8pMKI3XraKqQXv2' target='_blank' style='background-color: transparent; color: rgb(65, 131, 196);'>this link</a>. If you are approved to translate, you will be contacted by social media.</p>",
      trans_rules: "<h1>Translation Services</h1><p><br></p><p>***The use of google translator or similar is not allowed. Participants using google translator will not be accepted.&nbsp;</p><p><br></p><p>Reward starts at 1000 shares per translation of white paper and may be increased based on quality of translation.&nbsp;</p><p>Users in the bounty program can reserve translation by submitting a link to a sample translation and an email.&nbsp;</p><p>User will be able to see whether translations have been accepted from the Translation tab.</p>",
      trans_link: "<p>Please submit a sample translation using&nbsp;<a href='https://goo.gl/forms/Tdqnd3won6vuhz3E3' target='_blank' style='color: rgb(65, 131, 196); background-color: transparent;'>this link</a>. If you are approved to translate, you will be contacted by email.</p>",
      theme_logo: "http://www.hsdtaxlaw.com/wp-content/uploads/2016/05/logo_placeholder.png",
      theme_nav_color: "#2c83ed",
      theme_button_color: "#9b9b9b",
      video_rules: "<h2>Video Contest</h2><p><br></p><p><strong style='font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); font-size: 11pt;'>Video Contest rules:</strong></p><p><br></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>Answer the question:</span></p><p><br></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>What would you do with the power of Neureal?</span></p><ul><li><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>Videos must be 150 seconds or shorter.</span></li><li><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>Video must include brief explanation of what Neureal is in your own words.</span></li><li><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>Video may contain no offensive material.</span></li></ul><p><br></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>The Neureal core team will select 10 finalists and the community will vote on the grand prize winner.</span></p><p><br></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>By entering the contest, you grant Neureal and its subsidiaries permission to use your video and all content, including your name, likeness, slogans, and descriptions, in corporate and promotional materials.</span></p><p>&nbsp;</p><p><em style='font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); font-size: 11pt;'>Submission window for entries begins March 28th and runs until the end of the Neureal public token sale. Finalists will be announced on the final day of the token sale and winners will be announced 60 days after the completion of the token sale.</em></p><p>&nbsp;</p><p><strong style='font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); font-size: 11pt;'>Prizes:</strong></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>Ten finalists will each receive 100 NEUREAL tokens to use toward the execution of their vision and how they’d use the power of Neureal.</span></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'><span class='ql-cursor'>﻿</span></span></p><p><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>One grand prize winner receives 1000 NEUREAL tokens to use toward the execution of their vision and how they’d use the power of Neureal, and the Neureal foundation will help in executing their Oracle(s) once Neureal is released to the public (estimated2 years from close of the TGE).</span></p><ul><li><span style='font-size: 11pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);'>A folder will be posted in the Neureal Telegram containing any graphics for our project you may want.</span></li></ul><p><br></p>"
    )
  end
end
