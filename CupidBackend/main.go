package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	r := gin.Default()
	//migrate if no db
	_, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	r.GET("/test", func(context *gin.Context) {
		context.JSON(200, "x:lol")
	})
	r.Run("localhost:80")
}
