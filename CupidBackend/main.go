package main

import (
	"cupid/Controllers"
	"cupid/Infrastructure"
	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	//migrate if no db
	Infrastructure.ConnectDatabase()
	r.GET("/api/user/", Controllers.GetAllUsers)
	r.GET("/api/user/:id", Controllers.GetUser)
	r.POST("/api/user/add", Controllers.AddUser)
	r.PUT("/api/user/edit/:id", Controllers.EditUser)
	r.DELETE("/api/user/delete/:id", Controllers.DeleteUser)
	r.Run()
}
