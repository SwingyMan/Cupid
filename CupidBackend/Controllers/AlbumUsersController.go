package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetAlbumUsers(c *gin.Context) {
	var albumUsers []Models.AlbumUsers
	if err := Infrastructure.DB.Find(&albumUsers).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, albumUsers)
	}
}

func GetAlbumUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var albumUser Models.AlbumUsers
	if err := Infrastructure.DB.Where("id = ?", id).First(&albumUser).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, albumUser)
	}
}

func CreateAlbumUser(c *gin.Context) {
	var albumUser Models.AlbumUsers
	c.BindJSON(&albumUser)

	if err := Infrastructure.DB.Create(&albumUser).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, albumUser)
	}
}

func UpdateAlbumUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var albumUser Models.AlbumUsers
	if err := Infrastructure.DB.Where("id = ?", id).First(&albumUser).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	c.BindJSON(&albumUser)

	if err := Infrastructure.DB.Save(&albumUser).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, albumUser)
	}
}

func DeleteAlbumUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var albumUser Models.AlbumUsers
	d := Infrastructure.DB.Where("id = ?", id).Delete(&albumUser)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
