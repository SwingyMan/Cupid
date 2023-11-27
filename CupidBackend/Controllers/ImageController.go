package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetImages(c *gin.Context) {
	var images []Models.Image
	if err := Infrastructure.DB.Find(&images).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, images)
	}
}

func GetImage(c *gin.Context) {
	id := c.Params.ByName("id")
	var image Models.Image
	if err := Infrastructure.DB.Where("id = ?", id).First(&image).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, image)
	}
}

func CreateImage(c *gin.Context) {
	var image Models.Image
	c.BindJSON(&image)

	if err := Infrastructure.DB.Create(&image).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, image)
	}
}

func UpdateImage(c *gin.Context) {
	id := c.Params.ByName("id")
	var image Models.Image
	if err := Infrastructure.DB.Where("id = ?", id).First(&image).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	c.BindJSON(&image)

	if err := Infrastructure.DB.Save(&image).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, image)
	}
}

func DeleteImage(c *gin.Context) {
	id := c.Params.ByName("id")
	var image Models.Image
	d := Infrastructure.DB.Where("id = ?", id).Delete(&image)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
