from django.db import models


class Apartment(models.Model):
    city = models.CharField(max_length=100)
    rent = models.FloatField()
    bedrooms = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    posted_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'apartments'
        ordering = ['-posted_date']
        
    def __str__(self):
        return f"{self.bedrooms} BHK in {self.city} for ₹{self.rent}"