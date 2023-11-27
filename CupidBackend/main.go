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

	r.GET("/api/albumimages", Controllers.GetAlbumImages)
	r.POST("/api/albumimages", Controllers.CreateAlbumImage)
	r.DELETE("/api/albumimages/:albumID/:imageID", Controllers.DeleteAlbumImage)

	r.GET("/api/albums", Controllers.GetAlbums)
	r.GET("/api/albums/:id", Controllers.GetAlbum)
	r.POST("/api/albums", Controllers.CreateAlbum)
	r.PUT("/api/albums/:id", Controllers.UpdateAlbum)
	r.DELETE("/api/albums/:id", Controllers.DeleteAlbum)

	r.GET("/api/images", Controllers.GetImages)
	r.GET("/api/images/:id", Controllers.GetImage)
	r.POST("/api/images", Controllers.CreateImage)
	r.PUT("/api/images/:id", Controllers.UpdateImage)
	r.DELETE("/api/images/:id", Controllers.DeleteImage)

	r.GET("/api/tags", Controllers.GetTags)
	r.GET("/api/tags/:id", Controllers.GetTag)
	r.POST("/api/tags", Controllers.CreateTag)
	r.PUT("/api/tags/:id", Controllers.UpdateTag)
	r.DELETE("/api/tags/:id", Controllers.DeleteTag)
	r.Run()
}
