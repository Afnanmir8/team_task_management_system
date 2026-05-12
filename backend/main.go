package main

import (
	"taskmanagement/config"
	"taskmanagement/models"
	"taskmanagement/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.Task{},
	)

	router := gin.Default()

	routes.SetupRoutes(router)

	router.Run(":5000")
}