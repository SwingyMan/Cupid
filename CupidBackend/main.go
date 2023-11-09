package main

import (
	"cupid/Controllers"
	"cupid/Infrastructure"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	//migrate if no db
	Infrastructure.ConnectDatabase()
	r.GET("/api/user/", Controllers.GetAllUsers)
	r.GET("/api/user/:id", Controllers.GetUser)
	r.POST("/api/user/add", Controllers.AddUser)
	go r.Run("localhost:80")
	err1 := r.Run("localhost:443")
	if err1 != nil {
		log.Panic(err1)
	}
}
