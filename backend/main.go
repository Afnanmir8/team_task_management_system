package main

import (
	"net/http"
	"os"
	"strings"
	"taskmanagement/config"
	"taskmanagement/models"
	"taskmanagement/routes"

	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	defaultOrigins := []string{
		"https://team-task-management-frontend.onrender.com",
		"https://team-task-management-system.vercel.app",
		"http://localhost:5173",
	}

	allowedOrigins := append([]string{}, defaultOrigins...)
	if envOrigins := os.Getenv("ALLOWED_ORIGINS"); envOrigins != "" {
		for _, origin := range strings.Split(envOrigins, ",") {
			origin = strings.TrimSpace(origin)
			if origin != "" {
				allowedOrigins = append(allowedOrigins, origin)
			}
		}
	}
	if frontendURL := strings.TrimSpace(os.Getenv("FRONTEND_URL")); frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}

	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
				break
			}
		}

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Vary", "Origin")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	// Set production mode
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.Task{},
	)

	router := gin.Default()

	// Set trusted proxies for Railway deployment
	router.SetTrustedProxies([]string{"127.0.0.1"})

	router.Use(corsMiddleware())

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Team Task Management API is running",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	routes.SetupRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router.Run(":" + port)
}
