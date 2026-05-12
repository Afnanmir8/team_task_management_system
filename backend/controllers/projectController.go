package controllers

import (
	"net/http"

	"taskmanagement/config"
	"taskmanagement/models"

	"github.com/gin-gonic/gin"
)

func CreateProject(c *gin.Context) {

	var project models.Project

	c.BindJSON(&project)

	config.DB.Create(&project)

	c.JSON(http.StatusOK, project)
}

func GetProjects(c *gin.Context) {

	var projects []models.Project

	config.DB.Find(&projects)

	c.JSON(http.StatusOK, projects)
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")

	var project models.Project

	if err := config.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	if err := config.DB.Delete(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project deleted"})
}
