package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	CreatedBy   uint   `json:"created_by"`
}