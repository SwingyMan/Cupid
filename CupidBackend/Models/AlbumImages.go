package Models

import "gorm.io/gorm"

type AlbumImages struct {
	gorm.Model
	AlbumID uint8
	ImageID uint8
}
