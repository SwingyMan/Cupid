package Models

type Album struct {
	AlbumID  uint8  `gorm:"primary_key;column:album_id;"`
	Title    string `gorm:"column:title;type:TEXT;"`
	Code     string `gorm:"column:code;type:TEXT;"`
	AdminID  uint8  `gorm:"column:admin_id;"`
	NumPages uint8  `gorm:"column:num_pages;"`
}
