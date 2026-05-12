package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"taskmanagement/config"
	"taskmanagement/models"
)

func CreateTask(c *gin.Context) {

	var task models.Task

	c.BindJSON(&task)

	task.Status = "Pending"

	config.DB.Create(&task)

	c.JSON(http.StatusOK, task)
}

func GetTasks(c *gin.Context) {

	var tasks []models.Task

	config.DB.Find(&tasks)

	c.JSON(http.StatusOK, tasks)
}

func UpdateTask(c *gin.Context) {

	id := c.Param("id")

	var task models.Task

	config.DB.First(&task, id)

	c.BindJSON(&task)

	config.DB.Save(&task)

	c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {

	id := c.Param("id")

	config.DB.Delete(&models.Task{}, id)

	c.JSON(http.StatusOK, gin.H{
		"message": "Task Deleted",
	})
}