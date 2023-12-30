package Models

import "gorm.io/gorm"

type Album struct {
	gorm.Model
	Title      string
	Image      []Image
	OwnerID    uint8
	IsOwner    bool
	InviteCode string
}
