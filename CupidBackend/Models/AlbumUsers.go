package Models

type AlbumPhotos struct {
	AlbumID uint8 `gorm:"primary_key;column:album_id;type:INT4;"`
	PhotoID uint8 `gorm:"column:photo_id;type:INT4;"`
	NumPage uint8 `gorm:"column:numPage;type:INT4;"`
}
