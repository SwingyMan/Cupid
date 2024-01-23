package Infrastructure

import (
	"cupid/Models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(postgres.Open(os.Getenv("db")), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	database.AutoMigrate(&Models.User{}, &Models.Tag{}, &Models.Photo{}, &Models.Album{}, &Models.Sticker{}, &Models.PhotoSet{}, &Models.AlbumPhotoSet{}, &Models.AlbumUser{})
	DB = database
}
