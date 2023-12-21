package Models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username     string
	Email        string
	Password     string
	IpOfRegistry string
	FirstName    string
	LastName     string
	Album        []Album
}