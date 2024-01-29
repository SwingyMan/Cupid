package Services

import (
	"math/rand"
	"time"
)

func GenerateRandomString(length int) string {
	rand.Seed(time.Now().UnixNano())

	// Define the characters that can be used in the random string
	characters := "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"

	// Initialize an empty string to store the result
	result := ""

	// Generate random characters and append them to the result string
	for i := 0; i < length; i++ {
		randomIndex := rand.Intn(len(characters))
		result += string(characters[randomIndex])
	}

	return result
}
