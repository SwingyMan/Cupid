package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"cupid/Services"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetImages(c *gin.Context) {
	var images []Models.Photo
	userid := c.Query("userId")
	if userid == "" {
		if err := Infrastructure.DB.Find(&images).Error; err != nil {
			c.AbortWithStatus(500)
			fmt.Println(err)
		} else {
			c.JSON(200, images)
		}
	} else {
		Infrastructure.DB.Where("User_ID = ?", userid).Find(&images)
		c.JSON(200, images)
	}
}

func GetImage(c *gin.Context) {
	id := c.Params.ByName("id")
	var image Models.Photo
	if err := Infrastructure.DB.Where("id = ?", id).First(&image).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, image)
	}
}

func CreateImage(c *gin.Context) {
	var image Models.Photo
	var request Models.PhotoRequest
	c.BindJSON(&request)
	imageString := request.Url
	link := Services.WriteToImgur(imageString)
	userid := request.UserID
	image.UserID = userid
	image.URL = link
	if err := Infrastructure.DB.Create(&image).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, image)
	}
}

func UpdateImage(c *gin.Context) {
	id := c.Params.ByName("id")
	var image Models.Photo
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
	var image Models.Photo
	d := Infrastructure.DB.Where("id = ?", id).Delete(&image)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
