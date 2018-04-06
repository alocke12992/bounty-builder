class LiveStream < ApplicationRecord
  def self.current
    first_or_create(code: "123LiveStreamCode")
  end
end
