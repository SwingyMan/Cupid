package Models

import "gorm.io/gorm"

type AlbumUsers struct {
	gorm.Model
	UserID  []uint8 `gorm:"primaryKey"`
	AlbumID []uint8 `gorm:"primaryKey"`
	IsOwner bool
}
