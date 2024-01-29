package Services

import (
	"cupid/Infrastructure"
	"cupid/Models"
)

func GetUserIDs(albumID uint8) []int {
	var albumUsers []Models.AlbumUsers
	var userIDs []int

	Infrastructure.DB.Where("album_id = ?", albumID).Find(&albumUsers)

	for _, albumUser := range albumUsers {
		userIDs = append(userIDs, int(albumUser.UserID))
	}

	return userIDs
}

// Helper function to get photo IDs for an album
func GetPhotoIDs(albumID uint8) [][]int {
	var albumPhotos []Models.AlbumPhotos
	var photoIDs [][]int

	Infrastructure.DB.Where("album_id = ?", albumID).Find(&albumPhotos)

	for _, albumPhoto := range albumPhotos {
		photoIDs = append(photoIDs, []int{int(albumPhoto.PhotoID), int(albumPhoto.NumPage)})
	}

	return photoIDs
}
