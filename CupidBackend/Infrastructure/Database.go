package Infrastructure

import (
	"cupid/Models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	database.AutoMigrate(&Models.User{}, &Models.Tag{}, &Models.Image{}, &Models.Album{}, &Models.AlbumImages{})
	DB = database
}
