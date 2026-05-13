package main

import (
	"os"
	"taskmanagement/config"
	"taskmanagement/models"
	"taskmanagement/routes"

	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "https://team-task-management-frontend.onrender.com")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {

	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.Task{},
	)

	router := gin.Default()

	router.Use(corsMiddleware())

	routes.SetupRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	router.Run(":" + port)
}