package Models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	ImageLink string
	TagID     uint8
	AlbumID   uint8
	UserID    uint8
}
