package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"github.com/gin-gonic/gin"
	"strconv"
)

func AddUser(ctx *gin.Context) {
	var user Models.User
	ctx.Bind(&user)
	Infrastructure.DB.Create(&user)
	ctx.JSON(200, user)
}
func GetAllUsers(ctx *gin.Context) {
	var users []Models.User
	Infrastructure.DB.Find(&users)
	ctx.JSON(200, users)
}
func GetUser(ctx *gin.Context) {
	var user Models.User
	id := ctx.Param("id")
	Infrastructure.DB.Find(&user, id)
	ctx.JSON(200, user)
}
func EditUser(ctx *gin.Context) {
	var previousUser Models.User
	var newUser Models.User
	id := ctx.Param("id")
	Infrastructure.DB.Find(&previousUser, id)
	ctx.Bind(&newUser)
	newId, _ := strconv.ParseUint(id, 10, 32)
	newUser.ID = uint(newId)
	Infrastructure.DB.Save(&newUser)
	ctx.JSON(200, newUser)
}
func DeleteUser(ctx *gin.Context) {
	id := ctx.Param("id")
	Infrastructure.DB.Delete(&Models.User{}, id)
	ctx.JSON(200, "")
}
