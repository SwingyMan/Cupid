package main

import (
	"cupid/Controllers"
	"cupid/Infrastructure"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	//migrate if no db
	Infrastructure.ConnectDatabase()
	r.Use(cors.Default())
	r.GET("/api/users/", Controllers.GetAllUsers)
	r.GET("/api/users/:id", Controllers.GetUser)
	r.POST("/api/users/add", Controllers.AddUser)
	r.PUT("/api/users/edit/:id", Controllers.EditUser)
	r.DELETE("/api/users/delete/:id", Controllers.DeleteUser)

	r.GET("/api/albums", Controllers.GetAlbums)
	r.GET("/api/albums/:id", Controllers.GetAlbum)
	r.POST("/api/albums", Controllers.CreateAlbum)
	r.PUT("/api/albums/:id", Controllers.UpdateAlbum)
	r.DELETE("/api/albums/:id", Controllers.DeleteAlbum)

	r.GET("/api/photos", Controllers.GetImages)
	r.GET("/api/photos/:id", Controllers.GetImage)
	r.POST("/api/photos", Controllers.CreateImage)
	r.PUT("/api/photos/:id", Controllers.UpdateImage)
	r.DELETE("/api/photos/:id", Controllers.DeleteImage)

	r.GET("/api/tags", Controllers.GetTags)
	r.GET("/api/tags/:id", Controllers.GetTag)
	r.POST("/api/tags", Controllers.CreateTag)
	r.PUT("/api/tags/:id", Controllers.UpdateTag)
	r.DELETE("/api/tags/:id", Controllers.DeleteTag)

	r.Run()
}
