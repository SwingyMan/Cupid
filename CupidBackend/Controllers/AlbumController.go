package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"cupid/Services"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetAlbums(c *gin.Context) {
	var albums []Models.Album
	if err := Infrastructure.DB.Find(&albums).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, albums)
	}
}

func GetAlbum(c *gin.Context) {
	id := c.Params.ByName("id")
	var album Models.Album
	album.Code = id
	if err := Infrastructure.DB.Find(&album).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, album)
	}
}

func CreateAlbum(c *gin.Context) {
	var album Models.Album
	c.BindJSON(&album)
	album.Code = Services.GenerateRandomString(6)
	if err := Infrastructure.DB.Create(&album).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, album)
	}
}

func UpdateAlbum(c *gin.Context) {
	id := c.Params.ByName("InviteCode")
	var album = Models.Album{Code: id}
	if err := Infrastructure.DB.Where(&album).First(&album).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	c.BindJSON(&album)

	if err := Infrastructure.DB.Save(&album).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, album)
	}
}

func DeleteAlbum(c *gin.Context) {
	id := c.Params.ByName("id")
	var album = Models.Album{Code: id}
	d := Infrastructure.DB.Where(&album).Delete(&album)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
