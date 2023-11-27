package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetTags(c *gin.Context) {
	var tags []Models.Tag
	if err := Infrastructure.DB.Find(&tags).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, tags)
	}
}

func GetTag(c *gin.Context) {
	id := c.Params.ByName("id")
	var tag Models.Tag
	if err := Infrastructure.DB.Where("id = ?", id).First(&tag).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, tag)
	}
}

func CreateTag(c *gin.Context) {
	var tag Models.Tag
	c.BindJSON(&tag)

	if err := Infrastructure.DB.Create(&tag).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, tag)
	}
}

func UpdateTag(c *gin.Context) {
	id := c.Params.ByName("id")
	var tag Models.Tag
	if err := Infrastructure.DB.Where("id = ?", id).First(&tag).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	c.BindJSON(&tag)

	if err := Infrastructure.DB.Save(&tag).Error; err != nil {
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.JSON(200, tag)
	}
}
func DeleteTag(c *gin.Context) {
	id := c.Params.ByName("id")
	var tag Models.Tag
	d := Infrastructure.DB.Where("id = ?", id).Delete(&tag)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
