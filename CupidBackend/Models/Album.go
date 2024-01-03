package Models

import "gorm.io/gorm"

type Album struct {
	gorm.Model
	Title      string
	Image      []Image
	UserID     uint8
	Users      []User `gorm:"many2many:user_albums;"`
	InviteCode string
}
