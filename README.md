## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false, add_index: true|
|email|string|unique: true|
|password|string|null: false|
### Asociation
has_many: groups_users
has_many: groups, through:  :groups_users
has_many: messages


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group| integer| null: false|
### Asociation
has_many: groups_users
has_many: users, through:  :groups_users

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id||integer||
|group_id|integer||
belongs_to: user
belongs_to: group


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text| null: false|
|image|string| null: false|
|group_id| integer| foreign_key: true|
|users_id| integer| foreign_key: true|
### Asociation
 belongs_to: user
 belongs_to: group