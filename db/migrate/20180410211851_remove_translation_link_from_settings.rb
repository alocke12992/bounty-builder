class RemoveTranslationLinkFromSettings < ActiveRecord::Migration[5.1]
  def change
    remove_column :settings, :translation_link, :text, default: ""
  end
end
