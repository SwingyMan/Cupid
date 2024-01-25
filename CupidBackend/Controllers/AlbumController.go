package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"cupid/Services"
	"fmt"
	"github.com/gin-gonic/gin"
)

func GetAlbums(c *gin.Context) {
	var albumsJson []Models.AlbumJson
	Infrastructure.DB.Find(&albumsJson)
	for _, album := range albumsJson {
		userIDs := Services.GetUserIDs(album.ID)
		photoIDs := Services.GetPhotoIDs(album.ID)

		albumJson := Models.AlbumJson{
			ID:       album.ID,
			Title:    album.Title,
			Code:     album.Code,
			AdminID:  int(album.AdminID),
			NumPages: int(album.NumPages),
			UserIDs:  userIDs,
			PhotoIDs: photoIDs,
		}

		albumsJson = append(albumsJson, albumJson)
	}

	c.JSON(200, albumsJson)
}

func GetAlbum(c *gin.Context) {
	id := c.Params.ByName("id")
	var album Models.AlbumJson
	album.Code = id
	Infrastructure.DB.Find(&album)
	userIDs := Services.GetUserIDs(album.ID)
	photoIDs := Services.GetPhotoIDs(album.ID)

	albumJson := Models.AlbumJson{
		ID:       album.ID,
		Title:    album.Title,
		Code:     album.Code,
		AdminID:  album.AdminID,
		NumPages: album.NumPages,
		UserIDs:  userIDs,
		PhotoIDs: photoIDs,
	}

	if err := Infrastructure.DB.Find(&album).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, albumJson)
	}
}

func CreateAlbum(c *gin.Context) {
	var albumJson Models.AlbumJson
	var albumPhotos Models.AlbumPhotos
	var albumUsers Models.AlbumUsers
	var album Models.Album
	c.BindJSON(&albumJson)
	album.Code = Services.GenerateRandomString(6)
	album.AdminID = uint8(albumJson.AdminID)
	album.Title = albumJson.Title
	album.NumPages = uint8(albumJson.NumPages)
	Infrastructure.DB.Create(&album)
	for _, d := range albumJson.UserIDs {
		albumUsers.AlbumID = album.AlbumID
		albumUsers.UserID = uint8(d)
		Infrastructure.DB.Create(&albumUsers)
	}
	for i, d := range albumJson.PhotoIDs {
		for _, d1 := range d {
			albumPhotos.AlbumID = album.AlbumID
			albumPhotos.NumPage = uint8(i)
			albumPhotos.PhotoID = uint8(d1)
			Infrastructure.DB.Create(&albumPhotos)
		}
	}
	albumJson.ID = album.AlbumID
	albumJson.Code = album.Code
	c.JSON(200, albumJson)
}

func UpdateAlbum(c *gin.Context) {
	id := c.Params.ByName("InviteCode")
	var albumJson Models.AlbumJson
	var albumPhotos Models.AlbumPhotos
	var albumUsers Models.AlbumUsers
	var album Models.Album
	c.BindJSON(&albumJson)
	albumJson.Code = id
	album.Code = id
	album.AdminID = uint8(albumJson.AdminID)
	album.Title = albumJson.Title
	album.NumPages = uint8(albumJson.NumPages)
	Infrastructure.DB.Create(&album)
	for _, d := range albumJson.UserIDs {
		albumUsers.AlbumID = album.AlbumID
		albumUsers.UserID = uint8(d)
		Infrastructure.DB.Create(&albumUsers)
	}
	for i, d := range albumJson.PhotoIDs {
		for _, d1 := range d {
			albumPhotos.AlbumID = album.AlbumID
			albumPhotos.NumPage = uint8(i)
			albumPhotos.PhotoID = uint8(d1)
			Infrastructure.DB.Create(&albumPhotos)
		}
	}
	albumJson.ID = album.AlbumID
	albumJson.Code = album.Code
	c.JSON(200, albumJson)
}

func DeleteAlbum(c *gin.Context) {
	id := c.Params.ByName("id")
	var album = Models.Album{Code: id}
	d := Infrastructure.DB.Where(&album).Delete(&album)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
