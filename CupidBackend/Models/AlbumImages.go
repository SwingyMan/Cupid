package Models

import "gorm.io/gorm"

type AlbumImages struct {
	gorm.Model
	AlbumID uint8 `gorm:"primaryKey"`
	ImageID uint8 `gorm:"primaryKey"`
}
