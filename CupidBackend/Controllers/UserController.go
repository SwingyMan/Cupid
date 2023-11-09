package Controllers

import (
	"cupid/Infrastructure"
	"cupid/Models"
	"github.com/gin-gonic/gin"
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

}
func DeleteUser(ctx gin.Context) {

}
