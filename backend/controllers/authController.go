package controllers

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
	"taskmanagement/config"
	"taskmanagement/models"
	"taskmanagement/utils"
)

func Register(c *gin.Context) {

	var user models.User

	c.BindJSON(&user)

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)

	user.Password = string(hashedPassword)

	config.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "User Registered",
	})
}

func Login(c *gin.Context) {

	var input models.User
	var user models.User

	c.BindJSON(&input)

	config.DB.Where("email=?", input.Email).First(&user)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Credentials",
		})
		return
	}

	token, _ := utils.GenerateToken(user.ID, user.Role)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}