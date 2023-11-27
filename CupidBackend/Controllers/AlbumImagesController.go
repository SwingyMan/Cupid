package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetAlbumImages(c *gin.Context) {
	var albumImages []Models.AlbumImages
	if err := Infrastructure.DB.Find(&albumImages).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, albumImages)
	}
}

func CreateAlbumImage(c *gin.Context) {
	var albumImage Models.AlbumImages
	c.BindJSON(&albumImage)

	if err := Infrastructure.DB.Create(&albumImage).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, albumImage)
	}
}

func DeleteAlbumImage(c *gin.Context) {
	albumID := c.Params.ByName("albumID")
	imageID := c.Params.ByName("imageID")

	var albumImage Models.AlbumImages
	if err := Infrastructure.DB.Where("album_id = ? AND image_id = ?", albumID, imageID).First(&albumImage).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		return
	}

	d := Infrastructure.DB.Delete(&albumImage)
	fmt.Println(d)
	c.JSON(200, gin.H{"albumID": albumID, "imageID": imageID, "status": "deleted"})
}
