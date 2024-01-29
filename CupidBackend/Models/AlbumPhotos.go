package Models

type AlbumUsers struct {
	AlbumID uint8 `gorm:"primary_key;column:album_id;type:INT8;"`
	UserID  uint8 `gorm:"column:user_id;type:INT8;"`
}
