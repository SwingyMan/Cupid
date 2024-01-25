package Models

type Album struct {
	AlbumID  uint8  `gorm:"primary_key;column:album_id;type:INT8;"`
	Title    string `gorm:"column:title;type:TEXT;"`
	Code     string `gorm:"column:code;type:TEXT;"`
	AdminID  uint8  `gorm:"column:admin_id;type:INT2;"`
	NumPages uint8  `gorm:"column:num_pages;type:INT8;"`
}
