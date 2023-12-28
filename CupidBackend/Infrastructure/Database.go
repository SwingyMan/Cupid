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
	database.AutoMigrate(&Models.User{}, &Models.Tag{}, &Models.Image{}, &Models.Album{}, &Models.AlbumImages{})
	DB = database
}
