json.total_pages @rewards.total_pages
json.rewards @rewards do |reward|
  json.id reward.id
  json.user_id reward.user.id
  json.name reward.user["#{reward.source}"]
  url = ''
  if reward.post
    url = reward.post.url
  else
    case reward.source
    when 'facebook'
      url = 'https://www.facebook.com/SimplyVitalHealth/'
    when 'twitter'
      url = 'https://twitter.com/SimplyVitalHQ'
    when 'linkedin'
      url = 'https://www.linkedin.com/company/11024026/'
    when 'reddit'
      url = 'https://www.reddit.com/r/SimplyVitalHealth/'
    end
  end
  json.url url
  json.kind reward.source
  json.reason reward.reason
end
