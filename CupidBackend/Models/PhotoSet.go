package Models

type PhotoSet struct {
	ID      uint
	Photos  []Photo `gorm:"many2many:album_photos"`
	AlbumID uint8
	Album   Album `gorm:"foreignKey:AlbumID"`
}
