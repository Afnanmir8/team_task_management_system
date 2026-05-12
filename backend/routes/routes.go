package routes

import (
	"taskmanagement/controllers"
	"taskmanagement/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)

	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/projects", controllers.CreateProject)
	protected.GET("/projects", controllers.GetProjects)
	protected.DELETE("/projects/:id", controllers.DeleteProject)

	protected.POST("/tasks", controllers.CreateTask)
	protected.GET("/tasks", controllers.GetTasks)
	protected.PUT("/tasks/:id", controllers.UpdateTask)
	protected.DELETE("/tasks/:id", controllers.DeleteTask)
}
