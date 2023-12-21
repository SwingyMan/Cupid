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
	id := c.Params.ByName("InviteCode")
	var album Models.Album
	if err := Infrastructure.DB.Where("InviteCode = ?", id).First(&album).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, album)
	}
}

func CreateAlbum(c *gin.Context) {
	var album Models.Album
	c.BindJSON(&album)
	album.InviteCode = Services.GenerateRandomString(6)
	if err := Infrastructure.DB.Create(&album).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, album)
	}
}

func UpdateAlbum(c *gin.Context) {
	id := c.Params.ByName("InviteCode")
	var album Models.Album
	if err := Infrastructure.DB.Where("InviteCode = ?", id).First(&album).Error; err != nil {
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
	id := c.Params.ByName("InviteCode")
	var album Models.Album
	d := Infrastructure.DB.Where("InviteCode = ?", id).Delete(&album)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
