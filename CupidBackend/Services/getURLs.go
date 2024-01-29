package Services

import (
	"cupid/Infrastructure"
	"cupid/Models"
)

func GetURL(ids [][]int) [][]string {
	var resultArray [][]string

	for _, row := range ids {
		var rowURLs []string

		for _, id := range row {
			// Query for the "URL" field based on the current ID
			var yourModel Models.Photo
			if result := Infrastructure.DB.First(&yourModel, id); result.Error != nil {
				return nil
			}

			// Append the URL to the rowURLs slice
			rowURLs = append(rowURLs, yourModel.URL)
		}

		// Append the rowURLs slice to the resultArray
		resultArray = append(resultArray, rowURLs)
	}
	return resultArray
}
