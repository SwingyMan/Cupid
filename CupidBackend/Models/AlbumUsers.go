package Models

import "gorm.io/gorm"

type AlbumUsers struct {
	gorm.Model
	UserID  []uint8
	AlbumID []uint8
}
