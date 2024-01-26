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
	var albums []Models.Album
	code := c.Query("code")
	if code == "" {
		Infrastructure.DB.Find(&albums)
		for _, album := range albums {
			userIDs := Services.GetUserIDs(album.AlbumID)
			photoIDs := Services.GetPhotoIDs(album.AlbumID)
			photoID := Services.GroupElements(photoIDs)
			albumJson := Models.AlbumJson{
				ID:       album.AlbumID,
				Title:    album.Title,
				Code:     album.Code,
				AdminID:  int(album.AdminID),
				NumPages: int(album.NumPages),
				UserIDs:  userIDs,
				PhotoIDs: photoID,
			}

			albumsJson = append(albumsJson, albumJson)
		}

		c.JSON(200, albumsJson)
	} else {
		var album Models.Album
		Infrastructure.DB.Where("code = ?", code).Find(&album)
		userIDs := Services.GetUserIDs(album.AlbumID)
		photoIDs := Services.GetPhotoIDs(album.AlbumID)
		photoID := Services.GroupElements(photoIDs)
		albumJson := Models.AlbumJson{
			ID:       album.AlbumID,
			Title:    album.Title,
			Code:     album.Code,
			AdminID:  int(album.AdminID),
			NumPages: int(album.NumPages),
			UserIDs:  userIDs,
			PhotoIDs: photoID,
		}
		c.JSON(200, albumJson)
	}
}

func GetAlbum(c *gin.Context) {
	id := c.Params.ByName("id")
	var album Models.Album
	Infrastructure.DB.Where("albumId = ?", id).Find(&album)
	userIDs := Services.GetUserIDs(album.AlbumID)
	photoIDs := Services.GetPhotoIDs(album.AlbumID)
	photoID := Services.GroupElements(photoIDs)
	albumJson := Models.AlbumJson{
		ID:       album.AlbumID,
		Title:    album.Title,
		Code:     album.Code,
		AdminID:  int(album.AdminID),
		NumPages: int(album.NumPages),
		UserIDs:  userIDs,
		PhotoIDs: photoID,
	}
	c.JSON(200, albumJson)
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
	album.NumPages = uint8(len(albumJson.PhotoIDs))
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
	Infrastructure.DB.First(&album, "code = ?", id)
	Infrastructure.DB.Where(Models.AlbumPhotos{AlbumID: album.AlbumID}).Delete(&Models.AlbumPhotos{})
	Infrastructure.DB.Where(Models.AlbumUsers{AlbumID: album.AlbumID}).Delete(&Models.AlbumUsers{})
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
	Infrastructure.DB.Where(&album, "code = ?", id)
	Infrastructure.DB.Where(Models.AlbumPhotos{AlbumID: album.AlbumID}).Delete(&Models.AlbumPhotos{})
	Infrastructure.DB.Where(Models.AlbumUsers{AlbumID: album.AlbumID}).Delete(&Models.AlbumUsers{})
	d := Infrastructure.DB.Where(&album).Delete(&album)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
